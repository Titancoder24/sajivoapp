"use client";

import { Check, Languages, Moon, Sun, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { translatePage } from "@/lib/i18n";

type Theme = "light" | "grey" | "dark";
type Language = "en" | "hi";

const themes: Array<{ id: Theme; label: string; icon: typeof Sun }> = [
  { id: "light", label: "Light", icon: Sun },
  { id: "grey", label: "Grey", icon: Volume2 },
  { id: "dark", label: "Dark", icon: Moon },
];

export function AppPreferences() {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("sajivo-theme") as Theme | null;
    const savedLanguage = window.localStorage.getItem("sajivo-language") as Language | null;
    if (savedTheme && themes.some((item) => item.id === savedTheme)) setTheme(savedTheme);
    if (savedLanguage === "hi" || savedLanguage === "en") setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === "hi" ? "hi" : "en";
    window.localStorage.setItem("sajivo-theme", theme);
    window.localStorage.setItem("sajivo-language", language);
    if (language === "hi") {
      const timer = window.setTimeout(() => translatePage("hi"), 80);
      return () => window.clearTimeout(timer);
    }
  }, [theme, language]);

  return (
    <aside className="fixed right-4 top-[88px] z-[70] flex items-center gap-1 rounded-lg border border-[var(--rv-border)] bg-[var(--rv-surface)]/95 p-1 shadow-lg backdrop-blur" aria-label="Appearance and language preferences">
      <div className="flex items-center gap-0.5" role="group" aria-label="Choose theme">
        {themes.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => setTheme(id)} aria-label={`${label} theme`} aria-pressed={theme === id} title={`${label} theme`} className={`grid h-8 w-8 place-items-center rounded-full transition ${theme === id ? "bg-[var(--rv-terracotta)] text-white" : "text-[var(--rv-ink-2)] hover:bg-[var(--rv-bg)]"}`}>
            <Icon size={15} />
          </button>
        ))}
      </div>
      <span className="h-5 w-px bg-[var(--rv-border)]" aria-hidden="true" />
      <button type="button" onClick={() => { const next = language === "en" ? "hi" : "en"; window.localStorage.setItem("sajivo-language", next); window.location.reload(); }} aria-label={`Switch language to ${language === "en" ? "Hindi" : "English"}`} title="English / Hindi" className="flex h-8 items-center gap-1 rounded-full px-2 text-xs font-bold text-[var(--rv-ink-2)] hover:bg-[var(--rv-bg)]">
        <Languages size={14} /> {language === "en" ? "EN" : "हिन्दी"}
        {language === "hi" ? <Check size={12} /> : null}
      </button>
    </aside>
  );
}
