"use client";

import ChartDataTable from "@/components/common/chart-data-table";
import useThemeColors from "@/components/main/security/shared/use-theme-colors";
import { ApexOptions, ApexTooltipCustomOpts } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import CardHeader from "./card-header";
import { getStatisticsSeries, monthKeys, type StatisticTab } from "./data";

interface TooltipSeriesItem {
  name?: string;
}

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const palette = useThemeColors();
  const t = useTranslations("ecommerce.statistics");
  const tMonths = useTranslations("ecommerce.months");
  const tChart = useTranslations("security.workbench.chartData");

  const [selectedTab, setSelectedTab] = useState<StatisticTab>("overview");
  const [months, setMonths] = useState<[number, number]>([0, 11]);

  const handleDateRangeChange = useCallback(([start, end]: [Date, Date]) => {
    setMonths([start.getMonth(), end.getMonth()]);
  }, []);

  const series = useMemo(
    () =>
      getStatisticsSeries(selectedTab, t).map((s) => ({
        ...s,
        data: s.data.slice(months[0], months[1] + 1),
      })),
    [selectedTab, t, months],
  );

  const colors = useMemo(() => {
    switch (selectedTab) {
      case "sales":
        return [palette["data-primary"]];
      case "revenue":
        return [palette["data-secondary-line"]];
      case "overview":
      default:
        return [palette["data-primary"], palette["data-secondary-line"]];
    }
  }, [selectedTab, palette]);

  const options: ApexOptions = useMemo(
    () => ({
      legend: {
        show: selectedTab === "overview",
        fontSize: "12px",
        labels: { colors: palette.muted },
      },
      colors,
      chart: {
        animations: { enabled: false },
        background: "transparent",
        foreColor: palette.muted,
        fontFamily: palette["font-family"],
        height: 310,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "straight",
        width: selectedTab === "overview" ? [2, 2] : [2],
        dashArray: selectedTab === "overview" ? [0, 5] : 0,
      },
      fill: { type: "solid", opacity: 0.08 },
      markers: {
        size: months[0] === months[1] ? 4 : 0,
        strokeColors: palette["surface"],
        strokeWidth: 2,
        hover: {
          size: 6,
        },
      },
      grid: {
        borderColor: palette.border,
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        custom: function ({
          series: chartSeries,
          dataPointIndex,
          w,
        }: ApexTooltipCustomOpts) {
          const category =
            w.globals?.categoryLabels?.[dataPointIndex] ??
            w.config.xaxis?.categories?.[dataPointIndex] ??
            "";
          const colors = w.config.colors ?? [palette["data-primary"]];
          const seriesList =
            (w.config.series as unknown as TooltipSeriesItem[]) ?? [];

          const rows = seriesList
            .map((s, idx) => {
              const val = chartSeries[idx]?.[dataPointIndex];
              const color = colors[idx] ?? palette["data-primary"];
              const formattedVal =
                typeof val === "number" ? val.toLocaleString() : (val ?? "");
              return `
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full shrink-0" style="background-color: ${color}"></span>
                    <span class="w-13 text-xs text-foreground dark:text-foreground">${s.name ?? ""}</span>
                    <span class="text-xs font-medium text-gray-400 dark:text-muted-foreground">:</span>
                  </div>
                  <span class="text-xs font-medium text-foreground dark:text-foreground">${formattedVal}</span>
                </div>
              `;
            })
            .join("");

          return `
            <div class="min-w-32.5">
              <p class="mb-1 text-xs leading-4 text-muted-foreground dark:text-gray-400">${category}</p>
              <div class="flex flex-col gap-1">
                ${rows}
              </div>
            </div>
          `;
        },
      },
      xaxis: {
        type: "category",
        categories: monthKeys
          .slice(months[0], months[1] + 1)
          .map((key) => tMonths(key)),
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
          width: 2,
          position: "back",
          opacity: 1,
          stroke: {
            width: 0,
            color: "none",
          },
          fill: { type: "solid", color: palette.subtle },
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: palette["font-family"],
            colors: palette.muted,
          },
        },
      },
      yaxis: {
        min: 0,
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: palette["font-family"],
            colors: palette.muted,
          },
        },
        title: {
          text: "",
          style: {
            fontSize: "0px",
          },
        },
      },
    }),
    [colors, selectedTab, tMonths, palette, months],
  );

  return (
    <div className="em-module">
      <CardHeader
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onDateRangeChange={handleDateRangeChange}
      />

      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <p className="em-chart-meta">{tChart("financialSample")}</p>
        <div className="min-w-250 xl:min-w-full">
          {palette["data-primary"] && (
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={310}
            />
          )}
        </div>
      </div>
      <ChartDataTable
        categories={monthKeys
          .slice(months[0], months[1] + 1)
          .map((key) => tMonths(key))}
        series={series}
      />
    </div>
  );
}
