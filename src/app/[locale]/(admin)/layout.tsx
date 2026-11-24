"use client";

import SecurityShell from "@/components/main/security/shell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SecurityShell>{children}</SecurityShell>;
}
