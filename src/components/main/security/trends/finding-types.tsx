"use client";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import { findingTypeDistribution } from "../data";

export default function FindingTypes() {
  const t = useTranslations("security");
  return (
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
  );
}
