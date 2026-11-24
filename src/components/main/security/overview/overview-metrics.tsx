"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/icons";
import MetricSummary from "../shared/metric-summary";
import { getMetrics, isActive } from "../data";
import type { Vulnerability } from "../types";
interface OverviewMetricsProps {
  items: Vulnerability[];
}
export default function OverviewMetrics({ items }: OverviewMetricsProps) {
  const t = useTranslations("security"),
    locale = useLocale();
  const metrics = getMetrics(items),
    active = items.filter(isActive);
  const count = (v: number) => new Intl.NumberFormat(locale).format(v);
  const highCount = active.filter((v) => v.severity === "high").length,
    criticalCount = active.filter((v) => v.severity === "critical").length;
  return (
    <MetricSummary
      label={t("keyMetrics")}
      context={
        <>
          <span>{t("bandContextScope")}</span>
          <span>{t("snapshotDate")}</span>
        </>
      }
      items={[
        {
          label: t("metrics.active"),
          value: count(metrics.active),
          unit: t("units.findings"),
          lead: true,
        },
        {
          label: t("severity.critical"),
          value: count(criticalCount),
          unit: t("units.findings"),
        },
        {
          label: t("severity.high"),
          value: count(highCount),
          unit: t("units.findings"),
        },
        {
          label: t("metrics.overdue"),
          value: count(metrics.overdue),
          unit: t("units.findings"),
        },
      ]}
      footer={
        <>
          <details className="sec-metric-definition">
            <summary>{t("metrics.overdue")}</summary>
            <p>{t("overdueScopeNote")}</p>
          </details>
          <Link
            className="sec-text-link"
            href="/vulnerabilities?severity=critical"
          >
            {t("reviewCritical")}
            <ArrowRightIcon className="size-4 rtl:rotate-180" />
          </Link>
        </>
      }
    />
  );
}
