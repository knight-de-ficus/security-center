"use client";

import ChartDataTable from "@/components/common/chart-data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import useThemeColors from "@/components/main/security/shared/use-theme-colors";
import { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import CardHeader from "./card-header";
import { monthKeys, monthlySalesData } from "./data";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart() {
  const palette = useThemeColors();
  const tChart = useTranslations("security.workbench.chartData");
  const t = useTranslations("ecommerce");
  const tEncoding = useTranslations("security.chartEncoding");
  const options: ApexOptions = {
    colors: [palette["data-context"]],
    chart: {
      animations: { enabled: false },
      background: "transparent",
      foreColor: palette.muted,
      fontFamily: palette["font-family"],
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "38%",
        borderRadius: Number.parseFloat(palette["radius-small"]) || 0,
        borderRadiusApplication: "around",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toLocaleString(),
      offsetY: -20,
      style: {
        fontSize: "12px",
        fontFamily: palette["font-family"],
        fontWeight: 400,
        colors: [palette.muted],
      },
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: monthKeys.map((key) => t(`months.${key}`)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: palette.muted,
          fontFamily: palette["font-family"],
        },
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      max: 500,
      min: 0,
      tickAmount: 5,
      labels: {
        show: true,
        style: { fontSize: "12px", colors: palette.muted },
      },
    },
    grid: {
      borderColor: palette.border,
      strokeDashArray: 0,
      padding: {
        left: -10,
        right: 0,
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: { type: "solid", opacity: 1 },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
  };
  const series = [
    {
      name: t("monthlySales.series"),
      data: monthlySalesData.map((value, index) => ({
        x: t(`months.${monthKeys[index]}`),
        y: value,
        fillColor:
          palette[
            index === monthlySalesData.length - 1
              ? "data-primary"
              : "data-context"
          ],
      })),
    },
  ];

  return (
    <div className="em-module">
      <CardHeader />

      <ScrollArea className="max-w-full">
        <p className="em-chart-meta">{tChart("sample")}</p>
        <p className="em-chart-meta">{tEncoding("latest")}</p>
        <div className="min-w-162.5 xl:min-w-full">
          {palette["data-primary"] && (
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={200}
            />
          )}
        </div>
        <ChartDataTable
          categories={(options.xaxis?.categories ?? []).map(String)}
          series={[
            { name: t("monthlySales.series"), data: [...monthlySalesData] },
          ]}
        />
      </ScrollArea>
    </div>
  );
}
