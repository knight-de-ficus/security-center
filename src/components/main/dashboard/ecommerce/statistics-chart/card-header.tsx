"use client";

import { calendarNextArrow, calendarPreviousArrow } from "@/icons";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CalendarIcon } from "@/icons";
import { Input } from "@/components/ui/input";
import flatpickr from "flatpickr";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { StatisticTab } from "./data";

interface CardHeaderProps {
  selectedTab: StatisticTab;
  onTabChange: (tab: StatisticTab) => void;
  onDateRangeChange: (dates: [Date, Date]) => void;
}

const tabs: StatisticTab[] = ["overview", "sales", "revenue"];

export default function CardHeader({
  selectedTab,
  onTabChange,
  onDateRangeChange,
}: CardHeaderProps) {
  const t = useTranslations("ecommerce.statistics");
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!datePickerRef.current) return;

    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "d M Y",
      minDate: startDate,
      maxDate: endDate,
      defaultDate: [startDate, endDate],
      clickOpens: true,
      prevArrow: calendarPreviousArrow,
      nextArrow: calendarNextArrow,
      onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
          onDateRangeChange([selectedDates[0], selectedDates[1]]);
        }
      },
    });

    return () => {
      if (!Array.isArray(fp)) {
        fp.destroy();
      }
    };
  }, [onDateRangeChange]);

  return (
    <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="em-card-title">{t("title")}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <ButtonGroup>
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="default"
              onClick={() => onTabChange(tab)}
              aria-pressed={selectedTab === tab}
            >
              {t(tab)}
            </Button>
          ))}
        </ButtonGroup>

        <div className="relative inline-flex items-center">
          <CalendarIcon className="pointer-events-none absolute inset-s-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground dark:text-gray-400" />
          <Input
            ref={datePickerRef}
            className="em-date-input"
            placeholder={t("selectDateRange")}
            aria-label={t("selectDateRange")}
          />
        </div>
      </div>
    </div>
  );
}
