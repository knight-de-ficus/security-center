"use client";
import { useTranslations, useLocale } from "next-intl";
interface StatProps {
  label: string;
  value: number;
}
function Stat({ label, value }: StatProps) {
  const locale = useLocale();
  return (
    <div>
      <p className="em-profile-info-label">{label}</p>
      <p className="em-target-stat-value">
        {new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)}
      </p>
    </div>
  );
}
export default function MonthlyStats() {
  const t = useTranslations("ecommerce.monthlyTarget");
  return (
    <div className="em-target-stats">
      <Stat label={t("target")} value={20000} />
      <Stat label={t("revenue")} value={15110} />
      <Stat label={t("today")} value={3287} />
    </div>
  );
}
