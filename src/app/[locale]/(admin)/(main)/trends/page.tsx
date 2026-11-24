import SecurityTrends from "@/components/main/security/trends";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "趋势分析 | VULN",
  description: "漏洞发现与修复趋势 前端设计示例",
};
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SecurityTrends />;
}
