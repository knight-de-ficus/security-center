import Vulnerabilities from "@/components/main/security/vulnerabilities";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "漏洞管理 | VULN",
  description: "漏洞查看与编辑 前端设计示例",
};
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ severity?: string; ticket?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  return (
    <Vulnerabilities
      initialSeverity={query.severity}
      initialTicket={query.ticket}
    />
  );
}
