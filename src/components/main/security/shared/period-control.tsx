"use client";
import { useTranslations } from "next-intl";
import { CalendarIcon } from "@/icons";
import SecuritySelect from "./select";
interface PeriodControlProps {
  days: number;
  onChange: (days: number) => void;
}
export default function PeriodControl({ days, onChange }: PeriodControlProps) {
  const t = useTranslations("security");
  return (
    <div className="sec-period">
      <CalendarIcon className="size-4" />
      <SecuritySelect
        value={String(days)}
        onChange={(v) => onChange(Number(v))}
        label={t("period")}
        options={[7, 14, 30].map((v) => ({
          value: String(v),
          label: t("lastDays", { days: v }),
        }))}
      />
    </div>
  );
}
