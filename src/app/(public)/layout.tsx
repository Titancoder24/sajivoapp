import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen pb-[68px] md:pb-0">{children}</main>
      <PublicFooter />
    </>
  );
}
