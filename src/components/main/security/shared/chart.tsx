"use client";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { useTheme } from "@/context/theme-context";
import { useLocale, useTranslations } from "next-intl";
import useThemeColors from "./use-theme-colors";
import ChartDataTable from "@/components/common/chart-data-table";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="sec-chart-loading" aria-busy="true" />,
});
interface SecurityChartProps {
  kind?: "line" | "bar";
  categories: string[];
  series: { name: string; data: number[] }[];
  height?: number;
  horizontal?: boolean;
  /** Positive balance means more remediations than incoming findings. */
  balance?: boolean;
}
export default function SecurityChart({
  kind = "line",
  categories,
  series,
  height = 260,
  horizontal = false,
  balance = false,
}: SecurityChartProps) {
  const { theme } = useTheme();
  const locale = useLocale();
  const t = useTranslations("security");
  const dark = theme === "dark";
  // Identity stays stable across pages and themes. Comparison also uses dashes.
  const palette = useThemeColors();
  const colors = [
    palette["data-primary"],
    palette["data-secondary-line"],
    palette["data-category-3"],
    palette["data-category-4"],
  ];
  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: palette["font-family"],
      background: "transparent",
      foreColor: palette.muted,
      animations: { enabled: false },
      parentHeightOffset: 0,
    },
    colors,
    // ApexCharts merges updates in place. Undefined erases its defaults, while
    // omitted arrays retain annotations from the previous view. Clear explicitly.
    annotations: {
      images: [],
      texts: [],
      points: [],
      xaxis: [],
      yaxis: balance
        ? [{ y: 0, borderColor: palette.muted, strokeDashArray: 0 }]
        : [],
    },
    theme: { mode: dark ? "dark" : "light" },
    dataLabels: { enabled: false },
    stroke: {
      curve: "straight",
      width: kind === "line" ? 2 : 0,
      dashArray: series.length > 1 ? [0, 5] : 0,
    },
    grid: {
      borderColor: palette.border,
      strokeDashArray: 3,
      padding: { top: 4, right: 12, bottom: 0, left: 8 },
    },
    xaxis: {
      categories,
      tickAmount: 5,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { fontSize: "12px" },
        rotate: 0,
        hideOverlappingLabels: true,
        formatter: (v) =>
          /^\d{4}-\d{2}-\d{2}$/.test(String(v))
            ? String(v).slice(5).replace("-", "/")
            : String(v),
      },
    },
    yaxis: {
      min: series.some((s) => s.data.some((v) => v < 0)) ? undefined : 0,
      labels: {
        style: { fontSize: "12px" },
        formatter: (v) =>
          new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(v),
      },
    },
    legend: { show: false },
    markers: {
      size: 0,
      hover: { size: 4 },
      strokeColors: palette.surface,
    },
    fill: { opacity: 1 },
    plotOptions: {
      bar: {
        horizontal,
        borderRadius: 2,
        columnWidth: "38%",
        barHeight: "32%",
        colors: {
          backgroundBarColors: [],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 0,
          ranges: balance
            ? [
                {
                  from: -Number.MAX_SAFE_INTEGER,
                  to: -Number.EPSILON,
                  color: palette["data-increase"],
                },
                {
                  from: 0,
                  to: Number.MAX_SAFE_INTEGER,
                  color: palette["data-decrease"],
                },
              ]
            : [],
        },
      },
    },
    tooltip: {
      theme: dark ? "dark" : "light",
      shared: true,
      intersect: false,
      y: { formatter: (v) => `${v} ${t("units.findings")}` },
    },
  };
  return (
    <>
      <div
        className="sec-chart"
        role="img"
        aria-label={series
          .map((s) => `${s.name}: ${s.data.join(", ")}`)
          .join("; ")}
      >
        {palette["data-primary"] && (
          <ReactApexChart
            type={kind}
            options={options}
            series={series}
            height={height}
          />
        )}
      </div>
      <ChartDataTable categories={categories} series={series} />
    </>
  );
}
