import Link from "next/link";
import { BrandMark } from "@/components/sajivo/BrandMark";

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--rv-border)] bg-white">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--rv-ink-2)]">
            Sajivo connects homeowners with interior designers and execution contractors through structured briefs, transparent proposals, and project workspaces.
          </p>
        </div>
        {[
          ["Platform", [["Services", "/services"], ["Professionals", "/professionals"], ["How It Works", "/how-it-works"]]],
          ["For Professionals", [["Join Sajivo", "/for-professionals"], ["Discover Projects", "/designer/dashboard/discover"], ["Verifications", "/designer/dashboard/verifications"]]],
          ["Account", [["Login", "/login"], ["Create Account", "/register"], ["Notifications", "/notifications"]]],
        ].map(([title, items]) => (
          <div key={title as string}>
            <h3 className="text-sm font-bold text-[var(--rv-ink)]">{title as string}</h3>
            <div className="mt-3 grid gap-2">
              {(items as string[][]).map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-[var(--rv-ink-2)] hover:text-[var(--rv-terracotta)]">{label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
