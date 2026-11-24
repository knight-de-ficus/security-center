"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import PageHeader from "../shared/page-header";
import PeriodControl from "../shared/period-control";
import MetricStyleSelector from "../shared/metric-style-selector";
import MetricSummary from "../shared/metric-summary";
import SecurityChart from "../shared/chart";
import ActivityHeatmap from "../shared/activity-heatmap";
import {
  findingTypeDistribution,
  newFindings,
  remediated,
  trendDays,
  weeklyMttr,
} from "../data";
export default function SecurityTrends() {
  const t = useTranslations("security");
  const [days, setDays] = useState(30);
  const [view, setView] = useState("volume");
  const incoming = newFindings.slice(-days),
    outgoing = remediated.slice(-days);
  const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
  const net = sum(outgoing) - sum(incoming);
  // Small supporting metrics only; redundant ratios stay out (v1.1 §29.4).
  const stats = [
    { key: "newFindings", value: String(sum(incoming)), unit: "findings" },
    { key: "remediated", value: String(sum(outgoing)), unit: "findings" },
    {
      key: "netChangeLabel",
      value: net < 0 ? String(net) : `+${net}`,
      unit: "findings",
    },
    { key: "mttr", value: "3.6", unit: "days" },
  ];
  const rangeStart = trendDays.at(-days) ?? "";
  const rangeEnd = trendDays.at(-1) ?? "";
  return (
    <>
      <PageHeader
        page="trends"
        action={
          <>
            <MetricStyleSelector />
            <PeriodControl days={days} onChange={setDays} />
          </>
        }
      />
      <div
        className="sec-analysis-tabs"
        role="group"
        aria-label={t("chartView")}
      >
        <button
          aria-pressed={view === "volume"}
          onClick={() => setView("volume")}
        >
          {t("volumeView")}
        </button>
        <button
          aria-pressed={view === "balance"}
          onClick={() => setView("balance")}
        >
          {t("balanceView")}
        </button>
        <span>{t("historyDataset")}</span>
      </div>
      <MetricSummary
        compact
        label={t("analysisMetrics")}
        items={stats.map((s) => ({
          label: t(s.key),
          value: s.value,
          unit: t(`units.${s.unit}`),
        }))}
      />
      <ComponentCard
        variant="security"
        title={view === "volume" ? t("volumeView") : t("dailyBalance")}
        action={
          <span className="sec-period-caption">
            {t("metaRange", { start: rangeStart, end: rangeEnd })} ·{" "}
            {t("unitLabel", { unit: t("units.findings") })}
          </span>
        }
      >
        <SecurityChart
          categories={trendDays.slice(-days)}
          series={
            view === "volume"
              ? [
                  { name: t("newFindings"), data: incoming },
                  { name: t("remediated"), data: outgoing },
                ]
              : [
                  {
                    name: t("netChangeLabel"),
                    data: incoming.map((v, i) => outgoing[i] - v),
                  },
                ]
          }
          height={270}
          kind={view === "volume" ? "line" : "bar"}
          balance={view === "balance"}
        />
        {view === "volume" && (
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
        )}
        {view === "balance" && (
          <p className="sec-panel-footnote">{t("chartEncoding.balance")}</p>
        )}
        <p className="sec-panel-footnote">
          {t("historySample")} · {t("countNotRisk")}
        </p>
      </ComponentCard>
      <div className="sec-grid sec-equal-grid sec-analysis-pair">
        <ComponentCard
          columns={6}
          variant="security"
          title={t("remediationSpeed")}
        >
          <div className="sec-mttr-summary">
            <strong>
              3.6<span>{t("units.days")}</span>
            </strong>
            <span className="sec-positive">{t("mttrImprovement")}</span>
          </div>
          <div className="sec-weekly-bars">
            {weeklyMttr.map((v, i) => (
              <div key={i}>
                <span>{t("weekNumber", { week: i + 1 })}</span>
                <div>
                  <span style={{ width: `${(v / 6) * 100}%` }} />
                </div>
                <strong>
                  {v.toFixed(1)}
                  <small>{t("units.days")}</small>
                </strong>
              </div>
            ))}
          </div>
          <p className="sec-panel-footnote">{t("weeklyHistory")}</p>
        </ComponentCard>
        <ComponentCard columns={6} variant="security" title={t("findingTypes")}>
          <div className="sec-category-list">
            {findingTypeDistribution.map(({ id, percentage }) => (
              <div key={id} className={`category-${id}`}>
                <span className="sec-category-dot" />
                <span>{t(`categories.${id}`)}</span>
                <div className="sec-category-bar">
                  <span style={{ width: `${(percentage / 36) * 100}%` }} />
                </div>
                <strong>{percentage}%</strong>
              </div>
            ))}
          </div>
          <p className="sec-panel-footnote">{t("categoryDataset")}</p>
        </ComponentCard>
      </div>
      <ActivityHeatmap />
    </>
  );
}
