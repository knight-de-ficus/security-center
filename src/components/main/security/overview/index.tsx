"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, ArrowDownIcon, ArrowUpIcon } from "@/icons";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "../shared/page-header";
import PeriodControl from "../shared/period-control";
import MetricStyleSelector from "../shared/metric-style-selector";
import MetricSummary from "../shared/metric-summary";
import SecurityChart from "../shared/chart";
import SecurityBadge from "../shared/badge";
import {
  getMetrics,
  initialVulnerabilities,
  isActive,
  isOverdue,
  newFindings,
  remediated,
  severities,
  teams,
  trendDays,
} from "../data";
import PriorityList from "./priority-list";
export default function SecurityOverview() {
  const t = useTranslations("security");
  const locale = useLocale();
  const [days, setDays] = useState(30);
  const metrics = getMetrics(initialVulnerabilities);
  const active = initialVulnerabilities.filter(isActive);
  const count = (v: number) => new Intl.NumberFormat(locale).format(v);
  const closed = remediated.slice(-days).reduce((a, b) => a + b, 0),
    found = newFindings.slice(-days).reduce((a, b) => a + b, 0);
  const net = closed - found;
  const netDown = net >= 0;
  const rangeStart = trendDays.at(-days) ?? "";
  const rangeEnd = trendDays.at(-1) ?? "";
  const highCount = active.filter((v) => v.severity === "high").length;
  const criticalCount = active.filter((v) => v.severity === "critical").length;
  return (
    <>
      <PageHeader
        page="overview"
        action={
          <>
            <MetricStyleSelector />
            <PeriodControl days={days} onChange={setDays} />
            <Link
              className={buttonVariants({ variant: "security" })}
              href="/vulnerabilities"
            >
              {t("viewOpenTickets")}
            </Link>
          </>
        }
      />
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
      {/* Combined analysis band: trend (2) + severity distribution (1) */}
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
                            Math.round((value / metrics.active) * 1000) / 10,
                          )}
                          %
                        </small>
                      </span>
                    </div>
                    <div className="sec-bar-track">
                      <span
                        className={`sec-bar-fill sec-fill-${s}`}
                        style={{ width: `${(value / metrics.active) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="sec-grid sec-secondary-grid">
        <div data-columns={8} className="sec-panel">
          <div className="sec-panel-header">
            <h2>{t("businessRisk")}</h2>
          </div>
          <div className="sec-panel-body">
            <div className="sec-team-list">
              {teams.map((team, i) => {
                const items = active.filter((v) => v.team === team);
                return (
                  <div className="sec-team-row" key={team}>
                    <span className="sec-team-index">0{i + 1}</span>
                    <div className="sec-team-name">
                      <strong>{t(`teams.${team}`)}</strong>
                      <span>{t("assetsMonitored", { count: 12 + i * 8 })}</span>
                    </div>
                    <div className="sec-team-bar">
                      <span
                        style={{
                          width: `${(items.length / active.length) * 100}%`,
                        }}
                      />
                    </div>
                    <strong className="sec-tabular">{items.length}</strong>
                    <span className="sec-team-overdue">
                      {t("overdueCount", {
                        count: items.filter(isOverdue).length,
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
                <strong>
                  {active.filter((v) => v.status === "open").length}
                </strong>
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
      </div>
      <PriorityList
        items={active
          .filter((v) => v.severity === "critical")
          .slice()
          .sort((a, b) => a.due.localeCompare(b.due))
          .slice(0, 4)}
      />
    </>
  );
}
