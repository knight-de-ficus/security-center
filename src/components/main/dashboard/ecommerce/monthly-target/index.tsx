"use client";
import { Progress } from "@/components/ui/progress-bar";
import { useTranslations } from "next-intl";
import CardHeader from "./card-header";
import MonthlyStats from "./monthly-stats";
export default function MonthlyTarget() {
  const t = useTranslations("ecommerce.monthlyTarget");
  return (
    <div className="em-module em-gallery-stack">
      <CardHeader />
      <div className="em-target-progress">
        <strong>
          75.6<small>%</small>
        </strong>
        <Progress value={75.55} aria-label={t("title")} />
      </div>
      <MonthlyStats />
    </div>
  );
}
