import { Card, CardContent } from "@/components/ui/card";
import { PasswordHelpForm } from "@/features/auth/AuthForms";

export default function ResetPasswordPage() {
  return (
    <section className="page-shell grid min-h-[calc(100vh-180px)] place-items-center py-14">
      <Card className="w-full max-w-md">
        <CardContent>
          <h1 className="font-display text-3xl">Reset password</h1>
          <div className="mt-6"><PasswordHelpForm mode="reset" /></div>
        </CardContent>
      </Card>
    </section>
  );
}
