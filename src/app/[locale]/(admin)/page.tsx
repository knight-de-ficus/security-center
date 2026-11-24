import SecurityOverview from "@/components/main/security/overview";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "安全态势总览 | VULN",
  description: "漏洞风险总览与修复态势 前端设计示例",
};
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SecurityOverview />;
}
