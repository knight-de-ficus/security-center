"use client";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import { heatmap, trendDays } from "../data";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
export default function ActivityHeatmap() {
  const t = useTranslations("security");
  return (
    <ComponentCard
      columns={12}
      variant="security"
      title={t("activityHeatmap")}
      action={
        <span className="sec-period-caption">
          {t("metaRange", { start: trendDays[2], end: trendDays.at(-1) ?? "" })}
        </span>
      }
    >
      <div className="sec-heatmap-scroll">
        <div className="sec-heatmap-labels">
          <span />
          {[1, 2, 3, 4].map((v) => (
            <span key={v}>{t("weekNumber", { week: v })}</span>
          ))}
        </div>
        {heatmap.map((row) => (
          <div className="sec-heatmap-row" key={row.team}>
            <span>{t(`teams.${row.team}`)}</span>
            <div>
              {row.values.map((v, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger
                    className={`sec-heatmap-cell heat-${v}`}
                    aria-label={`${t(`teams.${row.team}`)} · ${trendDays[i + 2]} · ${v} ${t("units.findings")}`}
                  />
                  <TooltipContent>
                    {t(`teams.${row.team}`)} · {trendDays[i + 2]} · {v}{" "}
                    {t("units.findings")}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="sec-heatmap-key">
        <span>{t("less")}</span>
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <span key={v} className="sec-heatmap-key-item">
            <i className={`heat-${v}`} aria-hidden="true" />
            <span>{v}</span>
          </span>
        ))}
        <span>{t("more")}</span>
        <p>{t("heatmapDataset")}</p>
      </div>
    </ComponentCard>
  );
}
