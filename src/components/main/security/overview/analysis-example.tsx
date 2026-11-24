"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { initialVulnerabilities } from "../data";
import PeriodControl from "../shared/period-control";
import RiskAnalysis from "./risk-analysis";
import TeamRisk from "./team-risk";
import RemediationQueue from "./remediation-queue";

export default function AnalysisExample() {
  const t = useTranslations("businessExamples");
  const [days, setDays] = useState(30);
  return (
    <section id="security-analysis" className="em-gallery-stack">
      <h2 className="em-section-title">{t("risk")}</h2>
      <PeriodControl days={days} onChange={setDays} />
      <RiskAnalysis days={days} items={initialVulnerabilities} />
      <div className="sec-grid sec-secondary-grid">
        <TeamRisk items={initialVulnerabilities} />
        <RemediationQueue items={initialVulnerabilities} />
      </div>
    </section>
  );
}
