"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import PageHeader from "../shared/page-header";
import PeriodControl from "../shared/period-control";
import MetricStyleSelector from "../shared/metric-style-selector";
import OverviewMetrics from "./overview-metrics";
import { initialVulnerabilities, isActive } from "../data";
import PriorityList from "./priority-list";
import RiskAnalysis from "./risk-analysis";
import TeamRisk from "./team-risk";
import RemediationQueue from "./remediation-queue";
export default function SecurityOverview() {
  const t = useTranslations("security");
  const [days, setDays] = useState(30);
  const active = initialVulnerabilities.filter(isActive);
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
      <OverviewMetrics items={initialVulnerabilities} />
      {/* Combined analysis band: trend (2) + severity distribution (1) */}
      <RiskAnalysis days={days} items={initialVulnerabilities} />
      <div className="sec-grid sec-secondary-grid">
        <TeamRisk items={initialVulnerabilities} />
        <RemediationQueue items={initialVulnerabilities} />
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
