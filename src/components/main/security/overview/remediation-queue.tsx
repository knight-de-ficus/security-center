"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/icons";
import { getMetrics, isActive } from "../data";
import type { Vulnerability } from "../types";
interface RemediationQueueProps {
  items: Vulnerability[];
}
export default function RemediationQueue({ items }: RemediationQueueProps) {
  const t = useTranslations("security");
  const locale = useLocale();
  const count = (value: number) => new Intl.NumberFormat(locale).format(value);
  const active = items.filter(isActive),
    metrics = getMetrics(items);
  return (
    <div data-columns={4} className="sec-panel">
      <div className="sec-panel-header">
        <h2>{t("remediationQueue")}</h2>
      </div>
      <div className="sec-panel-body">
        <div className="sec-queue">
          <div>
            <span>{t("assigned")}</span>
            <strong>
              {active.filter((v) => v.status === "inProgress").length}
            </strong>
          </div>
          <div>
            <span>{t("awaitingTriage")}</span>
            <strong>{active.filter((v) => v.status === "open").length}</strong>
          </div>
        </div>
        <div className="sec-workflow-progress">
          <div>
            <span>{t("metrics.remediationRate")}</span>
            <strong>
              {count(Math.round(metrics.rate * 10) / 10)}%
              <span className="sec-band-meta">
                {" "}
                {t("resolvedOfTotal", {
                  resolved: metrics.resolved,
                  total: metrics.total,
                })}
              </span>
            </strong>
          </div>
          <div className="sec-bar-track">
            <span
              className="sec-bar-fill"
              style={{
                width: `${metrics.rate}%`,
                background: "var(--color-sec-data-primary)",
              }}
            />
          </div>
        </div>
        <Link href="/vulnerabilities" className="sec-text-link">
          {t("openWorkspace")}
          <ArrowRightIcon className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
