"use client";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import { weeklyMttr } from "../data";

export default function RemediationSpeed() {
  const t = useTranslations("security");
  return (
    <ComponentCard columns={6} variant="security" title={t("remediationSpeed")}>
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
  );
}
