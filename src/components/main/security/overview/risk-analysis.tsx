"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, ArrowDownIcon, ArrowUpIcon } from "@/icons";
import SecurityChart from "../shared/chart";
import SecurityBadge from "../shared/badge";
import {
  getMetrics,
  isActive,
  newFindings,
  remediated,
  severities,
  trendDays,
} from "../data";
import type { Vulnerability } from "../types";
interface RiskAnalysisProps {
  days: number;
  items: Vulnerability[];
}
export default function RiskAnalysis({ days, items }: RiskAnalysisProps) {
  const t = useTranslations("security");
  const locale = useLocale();
  const count = (value: number) => new Intl.NumberFormat(locale).format(value);
  const active = items.filter(isActive);
  const metrics = getMetrics(items);
  const closed = remediated.slice(-days).reduce((a, b) => a + b, 0),
    found = newFindings.slice(-days).reduce((a, b) => a + b, 0);
  const net = closed - found,
    netDown = net >= 0;
  const rangeStart = trendDays.at(-days) ?? "",
    rangeEnd = trendDays.at(-1) ?? "";
  return (
    <section
      data-columns={12}
      className="sec-analysis-band"
      aria-label={t("riskChangeTitle")}
    >
      <div className="sec-band-head">
        <h2>{t("riskChangeTitle")}</h2>
        <span className="sec-band-meta">
          {t("metaRange", { start: rangeStart, end: rangeEnd })} ·{" "}
          {t("unitLabel", { unit: t("units.findings") })}
        </span>
        <Link className="sec-text-link" href="/trends">
          {t("exploreAnalysis")}
          <ArrowRightIcon className="size-4 rtl:rotate-180" />
        </Link>
      </div>
      <div className="sec-band-columns">
        <div data-columns={8} className="sec-band-pane">
          <h3>{t("analysisTrendTitle")}</h3>
          <div className="sec-pane-summary">
            <strong>
              {count(net)}
              <span>{t("units.findings")}</span>
            </strong>
            <span className={netDown ? "sec-positive" : "sec-negative"}>
              {netDown ? (
                <ArrowDownIcon className="size-3" />
              ) : (
                <ArrowUpIcon className="size-3" />
              )}
              {netDown
                ? t("netReduction", { days })
                : t("netIncrease", { days })}
            </span>
          </div>
          <SecurityChart
            categories={trendDays.slice(-days)}
            series={[
              { name: t("newFindings"), data: newFindings.slice(-days) },
              { name: t("remediated"), data: remediated.slice(-days) },
            ]}
            height={230}
          />
          <div className="sec-chart-legend">
            <span>
              <i className="sec-legend-dot" />
              {t("newFindings")}
            </span>
            <span>
              <i className="sec-legend-dot secondary" />
              {t("remediated")}
            </span>
          </div>
          <p className="sec-pane-source">{t("independentHistory")}</p>
        </div>
        <div data-columns={4} className="sec-band-pane">
          <h3>{t("analysisSeverityTitle")}</h3>
          <div className="sec-distribution-total">
            <strong>{count(metrics.active)}</strong>
            <span>{t("activeFindings")}</span>
          </div>
          <div className="sec-severity-bars">
            {severities.map((s) => {
              const value = active.filter((v) => v.severity === s).length;
              return (
                <div className="sec-severity-row" key={s}>
                  <div>
                    <SecurityBadge severity={s} />
                    <span className="sec-tabular">
                      {value}
                      <small>
                        {count(
                          Math.round((value / (metrics.active || 1)) * 1000) /
                            10,
                        )}
                        %
                      </small>
                    </span>
                  </div>
                  <div className="sec-bar-track">
                    <span
                      className={`sec-bar-fill sec-fill-${s}`}
                      style={{
                        width: `${(value / (metrics.active || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
