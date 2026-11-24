"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ActivityHeatmap from "../shared/activity-heatmap";
import SecurityOverview from "../overview";
import SecurityTrends from "../trends";
import Vulnerabilities from "../vulnerabilities";

export default function BusinessGallery() {
  const t = useTranslations("security");
  return (
    <>
      <header className="sec-page-header">
        <h1>{t("workbench.businessTitle")}</h1>
      </header>
      <p className="sec-register-caption">{t("workbench.businessNotice")}</p>
      <ActivityHeatmap />
      <section
        className="em-business-compositions"
        data-columns={12}
        aria-label={t("workbench.businessPreview")}
      >
        <h2 className="em-section-title">{t("workbench.businessPreview")}</h2>
        <Tabs defaultValue="overview">
          <TabsList aria-label={t("workbench.businessPreview")}>
            <TabsTrigger value="overview">{t("nav.overview")}</TabsTrigger>
            <TabsTrigger value="trends">{t("nav.trends")}</TabsTrigger>
            <TabsTrigger value="vulnerabilities">
              {t("nav.vulnerabilities")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <SecurityOverview />
          </TabsContent>
          <TabsContent value="trends">
            <SecurityTrends />
          </TabsContent>
          <TabsContent value="vulnerabilities">
            <Vulnerabilities />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
