"use client";

import { useTranslations } from "next-intl";
import SecurityBadge from "@/components/main/security/shared/badge";
import { severities, statuses } from "@/components/main/security/data";
import ComponentCard from "@/components/common/component-card";

export default function RiskLabels() {
  const t = useTranslations("businessExamples");
  return (
    <ComponentCard title={t("badges")}>
      <div className="em-control-row flex-wrap">
        {severities.map((severity) => (
          <SecurityBadge key={severity} severity={severity} />
        ))}
        {statuses.map((status) => (
          <SecurityBadge key={status} status={status} />
        ))}
      </div>
    </ComponentCard>
  );
}
