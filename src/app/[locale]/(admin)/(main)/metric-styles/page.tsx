import MetricStyles from "@/components/main/security/metric-styles";
import { setRequestLocale } from "next-intl/server";
export const metadata = { title: "Metric appearance comparison | VULN" };
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MetricStyles />;
}
