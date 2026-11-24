import SecurityChartExample from "@/components/others/charts/security-examples";
import RemediationSpeed from "@/components/main/security/trends/remediation-speed";
import FindingTypes from "@/components/main/security/trends/finding-types";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ComponentCard from "@/components/common/component-card";
import LineChartOne from "@/components/others/charts/line/one";
import BarChartOne from "@/components/others/charts/bar/one";
export const metadata = { title: "charts | VULN" };
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sidebar.items");
  return (
    <>
      <PageBreadcrumb pageTitle={t("chartExamples")} />
      <div className="em-gallery-stack">
        <ComponentCard title={t("lineChart")}>
          <LineChartOne />
        </ComponentCard>
        <SecurityChartExample view="volume" />
        <ComponentCard title={t("barChart")}>
          <BarChartOne />
        </ComponentCard>
        <SecurityChartExample view="balance" />
        <div className="sec-grid sec-equal-grid sec-analysis-pair">
          <RemediationSpeed />
          <FindingTypes />
        </div>
      </div>
    </>
  );
}
