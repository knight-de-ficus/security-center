import VulnerabilityQueryView from "@/components/main/security/vulnerabilities/query-view";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "漏洞管理 | VULN",
  description: "漏洞查看与编辑 前端设计示例",
};
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense fallback={null}>
      <VulnerabilityQueryView />
    </Suspense>
  );
}
