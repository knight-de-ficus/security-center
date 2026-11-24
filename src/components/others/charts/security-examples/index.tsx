"use client";

import { useState } from "react";
import PeriodControl from "@/components/main/security/shared/period-control";
import TrendChart from "@/components/main/security/trends/trend-chart";

interface SecurityChartExampleProps {
  view: "volume" | "balance";
}

export default function SecurityChartExample({
  view,
}: SecurityChartExampleProps) {
  const [days, setDays] = useState(30);
  return (
    <div className="em-gallery-stack">
      <PeriodControl days={days} onChange={setDays} />
      <TrendChart days={days} view={view} />
    </div>
  );
}
