"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { initialVulnerabilities } from "../data";
import OverviewMetrics from "../overview/overview-metrics";

export default function SnapshotExample() {
  const t = useTranslations("businessExamples");
  const [empty, setEmpty] = useState(false);
  return (
    <section id="snapshot-metrics" className="em-gallery-stack">
      <h2 className="em-section-title">{t("metrics")}</h2>
      <div
        className="em-control-row flex-wrap"
        role="group"
        aria-label={t("snapshot")}
      >
        <Button
          variant="outline"
          aria-pressed={!empty}
          onClick={() => setEmpty(false)}
        >
          {t("full")}
        </Button>
        <Button
          variant="outline"
          aria-pressed={empty}
          onClick={() => setEmpty(true)}
        >
          {t("empty")}
        </Button>
      </div>
      <OverviewMetrics items={empty ? [] : initialVulnerabilities} />
    </section>
  );
}
