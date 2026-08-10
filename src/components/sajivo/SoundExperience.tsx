"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Cue = "click" | "scroll" | "enabled";
type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

const SOUND_PREFERENCE_KEY = "sajivo-sound-enabled";

export function SoundExperience() {
  const [enabled, setEnabled] = useState(true);
  const contextRef = useRef<AudioContext | null>(null);
  const interactedRef = useRef(false);

  useEffect(() => {
    setEnabled(window.localStorage.getItem(SOUND_PREFERENCE_KEY) !== "false");
  }, []);

  function getContext() {
    if (contextRef.current) return contextRef.current;
    const AudioContextConstructor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioContextConstructor) return null;
    contextRef.current = new AudioContextConstructor();
    return contextRef.current;
  }

  function playCue(cue: Cue, force = false) {
    if ((!enabled && !force) || !interactedRef.current) return;
    const context = getContext();
    if (!context) return;
    if (context.state === "suspended") void context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.connect(gain);
    gain.connect(context.destination);

    if (cue === "scroll") {
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(128, now);
      oscillator.frequency.exponentialRampToValueAtTime(96, now + 0.025);
      gain.gain.setValueAtTime(0.007, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      oscillator.start(now);
      oscillator.stop(now + 0.032);
      return;
    }

    oscillator.type = "triangle";
    const startFrequency = cue === "enabled" ? 360 : 260;
    const endFrequency = cue === "enabled" ? 640 : 410;
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + 0.055);
    gain.gain.setValueAtTime(cue === "enabled" ? 0.035 : 0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  }

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let accumulatedDistance = 0;
    let lastScrollCueAt = 0;

    const unlockAudio = () => {
      interactedRef.current = true;
      if (enabled) {
        const context = getContext();
        if (context?.state === "suspended") void context.resume();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      unlockAudio();
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest("[data-sound-control]")) return;
      if (target.closest("button, a, [role='button'], input[type='submit'], input[type='button']")) playCue("click");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      unlockAudio();
      if ((event.key === "Enter" || event.key === " ") && event.target instanceof Element && event.target.closest("button, a, [role='button']")) {
        playCue("click");
      }
    };

    const handleWheel = () => unlockAudio();

    const handleScroll = () => {
      if (!enabled || !interactedRef.current) {
        previousScrollY = window.scrollY;
        return;
      }

      accumulatedDistance += Math.abs(window.scrollY - previousScrollY);
      previousScrollY = window.scrollY;
      const now = window.performance.now();
      if (accumulatedDistance >= 72 && now - lastScrollCueAt >= 140) {
        accumulatedDistance = 0;
        lastScrollCueAt = now;
        playCue("scroll");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled]);

  useEffect(() => () => {
    void contextRef.current?.close();
    contextRef.current = null;
  }, []);

  function toggleSound() {
    interactedRef.current = true;
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, String(next));
    if (next) playCue("enabled", true);
  }

  const label = enabled ? "Mute interface sounds" : "Enable interface sounds";

  return (
    <button
      type="button"
      data-sound-control
      className="button-3d button-depth-outline rv-focus fixed bottom-20 right-4 z-[60] grid h-10 w-10 place-items-center rounded-full border border-[var(--rv-border-strong)] bg-white text-[var(--rv-ink)] md:bottom-5 md:right-5"
      onClick={toggleSound}
      aria-label={label}
      aria-pressed={enabled}
      title={label}
    >
      {enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </button>
  );
}
