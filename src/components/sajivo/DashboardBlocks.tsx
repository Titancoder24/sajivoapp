"use client";

import { motion } from "framer-motion";
import { Bell, Briefcase, ClipboardList, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardHeader({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h1 className="font-display text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--rv-ink-2)]">{text}</p>
      </div>
      {action}
    </div>
  );
}

export function StatGrid({ stats }: { stats: { label: string; value: string | number }[] }) {
  const icons = [FolderOpen, ClipboardList, Briefcase, Bell];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = icons[index % icons.length];
        return (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <Card>
              <CardContent>
                <Icon className="text-[var(--rv-terracotta)]" size={20} />
                <p className="font-display mt-4 text-3xl">{stat.value}</p>
                <p className="text-sm text-[var(--rv-ink-2)]">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
