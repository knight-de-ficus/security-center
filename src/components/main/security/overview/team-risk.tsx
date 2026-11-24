"use client";
import { useTranslations } from "next-intl";
import { isActive, isOverdue, teams } from "../data";
import type { Vulnerability } from "../types";
interface TeamRiskProps {
  items: Vulnerability[];
}
export default function TeamRisk({ items }: TeamRiskProps) {
  const t = useTranslations("security");
  const active = items.filter(isActive);
  return (
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
                      width: `${(items.length / (active.length || 1)) * 100}%`,
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
  );
}
