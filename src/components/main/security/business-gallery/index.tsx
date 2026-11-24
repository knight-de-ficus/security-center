"use client";
import { useTranslations } from "next-intl";
import ActivityHeatmap from "../shared/activity-heatmap";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
export default function HeatmapExamples() {
  const t = useTranslations("sidebar.items");
  return (
    <>
      <PageBreadcrumb pageTitle={t("securityComponents")} />
      <ActivityHeatmap />
    </>
  );
}
