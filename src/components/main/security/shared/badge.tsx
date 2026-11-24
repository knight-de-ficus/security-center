"use client";
import { useTranslations } from "next-intl";
import type { Severity, VulnerabilityStatus } from "../types";
interface BadgeProps {
  severity?: Severity;
  status?: VulnerabilityStatus;
}
export default function SecurityBadge({ severity, status }: BadgeProps) {
  const t = useTranslations("security");
  return (
    <span
      className={`sec-badge ${severity ? `sec-severity-${severity}` : `sec-status-${status}`}`}
    >
      <span className="sec-badge-dot" />
      {severity ? t(`severity.${severity}`) : t(`status.${status}`)}
    </span>
  );
}
