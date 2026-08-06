"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { roleDashboardPath } from "@/lib/constants";
import type { UserRole } from "@/types/domain";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("customer@sajivo.com");
  const [password, setPassword] = useState("Demo@123");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) {
      toast.error(payload.error ?? "Unable to login");
      return;
    }
    toast.success("Welcome back to Sajivo");
    router.push(roleDashboardPath[payload.role as UserRole] ?? "/dashboard");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </div>
      <Button disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
    </form>
  );
}

export function RegisterForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>((params.get("role") as UserRole) || "customer");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        email: form.get("email"),
        password: form.get("password"),
        role,
      }),
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) {
      toast.error(payload.error ?? "Unable to create account");
      return;
    }
    toast.success("Account created");
    router.push(roleDashboardPath[role]);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-3">
        {(["customer", "designer", "contractor"] as UserRole[]).map((item) => (
          <button type="button" key={item} onClick={() => setRole(item)} className={`rounded-md border p-3 text-left text-sm font-bold ${role === item ? "border-[var(--rv-terracotta)] bg-[rgba(198,93,71,0.08)]" : "border-[var(--rv-border)] bg-white"}`}>
            {item === "customer" ? "Customer" : item === "designer" ? "Designer" : "Contractor"}
          </button>
        ))}
      </div>
      <div>
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" name="fullName" defaultValue="New Sajivo User" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={`new-${Date.now()}@sajivo.com`} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" defaultValue="Demo@123" required />
      </div>
      <Button disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
    </form>
  );
}

export function PasswordHelpForm({ mode }: { mode: "forgot" | "reset" }) {
  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        toast.success(mode === "forgot" ? "Reset instructions are ready for the configured mail provider." : "Password reset request submitted.");
      }}
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="customer@sajivo.com" required />
      </div>
      {mode === "reset" ? (
        <div>
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" defaultValue="Demo@123" required />
        </div>
      ) : null}
      <Button>{mode === "forgot" ? "Send Reset Link" : "Reset Password"}</Button>
    </form>
  );
}
