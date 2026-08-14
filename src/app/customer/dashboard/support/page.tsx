"use client";

import { useState } from "react";
import { Bot, ChevronLeft, LifeBuoy, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const answers: Record<string, string> = {
  payment: "I can help check an invoice, payment reference, or receipt. Open Documents from your project workspace and share the public reference with support.",
  project: "Your project workspace keeps the brief, proposals, milestones, files, messages, and payment history together. Start from Projects in the left navigation.",
  account: "Your Sajivo ID is the stable reference support uses to find your account. Never share your password or OTP with anyone.",
};

export default function SupportPage() {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi. I’m Sajivo Support Assistant. Ask about projects, payments, receipts, or your account." }]);
  const [draft, setDraft] = useState("");
  function send() {
    const text = draft.trim(); if (!text) return;
    const key = Object.keys(answers).find((item) => text.toLowerCase().includes(item));
    setMessages((current) => [...current, { from: "you", text }, { from: "bot", text: key ? answers[key] : "I’ve recorded that. A support teammate can continue from this conversation. Please include your Sajivo ID and the relevant project, invoice, or payment reference." }]);
    setDraft("");
  }
  return <main className="mx-auto max-w-5xl"><div className="mb-5 flex items-center gap-3"><Link href="/customer/dashboard" className="text-[var(--rv-ink-2)] hover:text-[var(--rv-ink)]"><ChevronLeft size={18} /></Link><div><p className="text-xs font-bold uppercase tracking-wider text-[var(--rv-terracotta)]">Customer support</p><h1 className="font-display text-2xl">How can we help?</h1></div></div><div className="grid gap-5 lg:grid-cols-[1fr_300px]"><section className="flex min-h-[560px] flex-col rounded-lg border border-[var(--rv-border)] bg-[var(--rv-surface)]"><header className="flex items-center gap-3 border-b border-[var(--rv-border)] p-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--rv-terracotta-soft)] text-[var(--rv-terracotta)]"><Bot size={20} /></span><div><h2 className="font-bold">Sajivo Support Assistant</h2><p className="text-xs text-[var(--rv-ink-2)]">Available now, support team handoff included</p></div></header><div className="flex-1 space-y-3 overflow-y-auto p-5">{messages.map((message, index) => <div key={`${message.text}-${index}`} className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6 ${message.from === "you" ? "ml-auto bg-[var(--rv-terracotta)] text-white" : "bg-[var(--rv-surface-muted)] text-[var(--rv-ink)]"}`}>{message.text}</div>)}</div><div className="border-t border-[var(--rv-border)] p-4"><div className="flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask about a project, payment, or account" className="min-w-0 flex-1 rounded-md border border-[var(--rv-border)] bg-[var(--rv-surface-muted)] px-3 text-sm outline-none" /><Button size="icon" onClick={send} aria-label="Send message"><Send size={16} /></Button></div></div></section><aside className="grid content-start gap-4"><div className="rounded-lg border border-[var(--rv-border)] bg-[var(--rv-surface)] p-5"><LifeBuoy className="text-[var(--rv-terracotta)]" size={21} /><h2 className="mt-3 font-bold">Talk to support</h2><p className="mt-2 text-sm leading-6 text-[var(--rv-ink-2)]">If the assistant cannot resolve your issue, send the conversation to our support team with the relevant reference.</p><Button variant="outline" className="mt-4 w-full" onClick={() => setMessages((current) => [...current, { from: "bot", text: "Your conversation is ready for a support teammate. Please keep this window open for the handoff." }])}>Request human support</Button></div><div className="rounded-lg border border-[var(--rv-border)] bg-[var(--rv-surface)] p-5"><ShieldCheck className="text-emerald-600" size={21} /><h2 className="mt-3 font-bold">Security reminder</h2><p className="mt-2 text-sm leading-6 text-[var(--rv-ink-2)]">Sajivo support will never ask for your password, full payment credentials, or one-time password.</p></div></aside></div></main>;
}
