"use client";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import SecurityChart from "../shared/chart";
import { newFindings, remediated, trendDays } from "../data";
interface TrendChartProps {
  days: number;
  view: "volume" | "balance";
}
export default function TrendChart({ days, view }: TrendChartProps) {
  const t = useTranslations("security");
  const incoming = newFindings.slice(-days),
    outgoing = remediated.slice(-days);
  const rangeStart = trendDays.at(-days) ?? "",
    rangeEnd = trendDays.at(-1) ?? "";
  return (
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
  );
}
