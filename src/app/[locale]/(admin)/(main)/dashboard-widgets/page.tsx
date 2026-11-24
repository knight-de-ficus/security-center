import AnalysisExample from "@/components/main/security/overview/analysis-example";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import EcommerceMetrics from "@/components/main/dashboard/ecommerce/metrics";
import MonthlySalesChart from "@/components/main/dashboard/ecommerce/monthly-sales-chart";
import MonthlyTarget from "@/components/main/dashboard/ecommerce/monthly-target";
import StatisticsChart from "@/components/main/dashboard/ecommerce/statistics-chart";
import DemographicCard from "@/components/main/dashboard/ecommerce/demographic-card";
import RecentOrders from "@/components/main/dashboard/ecommerce/recent-orders";
import { getTranslations, setRequestLocale } from "next-intl/server";
export const metadata = { title: "Dashboard widgets | VULN" };
export default async function DashboardWidgets({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("security.workbench.directory");
  return (
    <>
      <PageBreadcrumb pageTitle={t("dashboard-widgets")} />
      <div className="em-grid em-example-grid">
        <section data-columns={8} className="em-span-8 em-widget-panel">
          <EcommerceMetrics />
        </section>
        <section data-columns={4} className="em-span-4 em-widget-panel">
          <MonthlyTarget />
        </section>
        <section data-columns={12} className="em-span-12">
          <MonthlySalesChart />
        </section>
        <section data-columns={12} className="em-span-12">
          <StatisticsChart />
        </section>
        <section data-columns={4} className="em-span-4 em-widget-panel">
          <DemographicCard />
        </section>
        <section data-columns={8} className="em-span-8 em-widget-panel">
          <RecentOrders />
        </section>
      </div>
      <AnalysisExample />
    </>
  );
}
