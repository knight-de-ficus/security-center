"use client";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import SecuritySelect from "./select";
import {
  metricAppearances,
  readMetricAppearance,
  setMetricAppearance,
  subscribeMetricAppearance,
  serverMetricAppearance,
  type MetricAppearance,
} from "@/utils/metric-appearance";
export default function MetricStyleSelector() {
  const t = useTranslations("security.metricStyles");
  const value = useSyncExternalStore(
    subscribeMetricAppearance,
    readMetricAppearance,
    serverMetricAppearance,
  );
  return (
    <SecuritySelect
      value={value}
      onChange={(value) => setMetricAppearance(value as MetricAppearance)}
      label={t("label")}
      options={metricAppearances.map((value) => ({ value, label: t(value) }))}
    />
  );
}
