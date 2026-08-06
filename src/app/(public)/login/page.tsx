import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/AuthForms";

export default function LoginPage() {
  return (
    <section className="page-shell grid min-h-[calc(100vh-180px)] place-items-center py-14">
      <Card className="w-full max-w-md">
        <CardContent>
          <h1 className="font-display text-3xl">Login to Sajivo</h1>
          <p className="mt-2 text-sm text-[var(--rv-ink-2)]">Use your customer, designer, or contractor account.</p>
          <div className="mt-6"><LoginForm /></div>
          <Link href="/forgot-password" className="mt-4 block text-sm font-semibold text-[var(--rv-terracotta)]">Forgot password?</Link>
        </CardContent>
      </Card>
    </section>
  );
}
