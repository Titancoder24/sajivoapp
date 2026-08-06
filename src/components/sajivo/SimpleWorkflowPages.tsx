"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";

export function EmptyWorkflow({ title, text, action }: { title: string; text: string; action?: string }) {
  return (
    <Card>
      <CardContent className="text-center">
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--rv-ink-2)]">{text}</p>
        {action ? <Button className="mt-5" onClick={() => toast.success(`${action} clicked`)}>{action}</Button> : null}
      </CardContent>
    </Card>
  );
}

export function ProfileForm() {
  return (
    <Card>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label>Full name</Label><Input defaultValue="Aarav Sharma" /></div>
          <div><Label>City</Label><Input defaultValue="Bengaluru" /></div>
          <div className="md:col-span-2"><Label>Bio</Label><Textarea defaultValue="Tell customers or professionals what you need and how you work." /></div>
          <div><Label>Services</Label><Input defaultValue="Full Home Interior Design, False Ceiling" /></div>
          <div><Label>Service areas</Label><Input defaultValue="Indiranagar, Whitefield, HSR Layout" /></div>
        </div>
        <Button className="mt-5" onClick={() => toast.success("Profile saved")}>Save Profile</Button>
      </CardContent>
    </Card>
  );
}

export function PortfolioManager() {
  return (
    <Card>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {["Warm Minimal Apartment", "Commercial Ceiling Rollout"].map((title) => (
            <div key={title} className="rounded-lg bg-[var(--rv-bg)] p-5">
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-[var(--rv-ink-2)]">Featured portfolio item with media upload, services, location, and completion year.</p>
              <div className="mt-4 flex gap-2"><Button variant="outline">Edit</Button><Button variant="ghost">Toggle Featured</Button></div>
            </div>
          ))}
        </div>
        <Button className="mt-5" onClick={() => toast.success("Portfolio project created")}>Add Portfolio Project</Button>
      </CardContent>
    </Card>
  );
}

export function VerificationManager() {
  return (
    <Card>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {["Identity", "Business", "Experience"].map((title) => (
            <div key={title} className="rounded-lg border border-[var(--rv-border)] p-4">
              <h3 className="font-bold">{title} Verification</h3>
              <p className="mt-2 text-sm text-[var(--rv-ink-2)]">Upload private documents for admin review.</p>
              <Button className="mt-4" variant="outline" onClick={() => toast.success(`${title} document uploaded`)}>Upload Document</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
