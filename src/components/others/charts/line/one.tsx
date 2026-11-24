"use client";

import ChartDataTable from "@/components/common/chart-data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import useThemeColors from "@/components/main/security/shared/use-theme-colors";
import { ApexOptions, ApexTooltipCustomOpts } from "apexcharts";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface TooltipSeriesItem {
  name?: string;
}

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const sampleSeries = [
  {
    name: "Sales",
    data: [
      8000, 13000, 7000, 6500, 3500, 7500, 6000, 18500, 12000, 4000, 9500, 7500,
    ],
  },
  {
    name: "Previous period",
    data: [
      7000, 10000, 8500, 6000, 5000, 6800, 7200, 14000, 10500, 6000, 8000, 6500,
    ],
  },
];

const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function LineChartOne() {
  const palette = useThemeColors();
  const tChart = useTranslations("security.workbench.chartData");
  const tEncoding = useTranslations("security.chartEncoding");
  const series = sampleSeries.map((s, i) => ({
    ...s,
    name: tEncoding(i === 0 ? "current" : "previous"),
  }));

  const options: ApexOptions = useMemo(
    () => ({
      legend: {
        show: true,
        labels: { colors: palette.muted },
      },
      colors: [palette["data-primary"], palette["data-secondary-line"]],
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
        width: 2,
        dashArray: [0, 5],
      },
      fill: { type: "solid", opacity: 0.08 },
      markers: {
        size: 0,
        colors: [palette["surface"]],
        strokeColors: [palette["data-primary"], palette["data-secondary-line"]],
        strokeWidth: 2,
        hover: {
          size: 5,
        },
      },
      grid: {
        position: "back",
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
        categories,
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
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: palette["font-family"],
            colors: palette.muted,
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: 0,
        max: 20000,
        tickAmount: 4,
        labels: {
          formatter: (val: number): string => {
            if (val === 0) return "0";
            return `${(val / 1000).toFixed(0)}K`;
          },
          style: {
            fontSize: "12px",
            fontFamily: palette["font-family"],
            colors: palette.muted,
          },
        },
        title: {
          text: undefined,
        },
      },
    }),
    [palette],
  );

  return (
    <ScrollArea className="max-w-full">
      <p className="em-chart-meta">{tChart("sample")}</p>
      <div id="chartOne" className="min-w-250 xl:min-w-full">
        {palette["data-primary"] && (
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        )}
      </div>
      <ChartDataTable
        categories={(options.xaxis?.categories ?? []).map(String)}
        series={series}
      />
    </ScrollArea>
  );
}
