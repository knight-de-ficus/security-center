"use client";

import ChartDataTable from "@/components/common/chart-data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import useThemeColors from "@/components/main/security/shared/use-theme-colors";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BarChartOne() {
  const palette = useThemeColors();
  const tChart = useTranslations("security.workbench.chartData");
  const tEncoding = useTranslations("security.chartEncoding");

  const options: ApexOptions = {
    colors: [palette["data-primary"], palette["data-secondary-line"]],
    chart: {
      animations: { enabled: false },
      background: "transparent",
      foreColor: palette.muted,
      fontFamily: palette["font-family"],
      type: "bar",
      height: 280,
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
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
      show: true,
      labels: { colors: palette.muted },
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
      name: tEncoding("current"),
      data: [230, 310, 270, 390, 210, 170, 260, 270, 150, 80, 180, 120],
    },
    {
      name: tEncoding("previous"),
      data: [190, 280, 240, 320, 230, 190, 220, 240, 180, 110, 160, 140],
    },
  ];

  return (
    <ScrollArea className="max-w-full">
      <p className="em-chart-meta">{tChart("sample")}</p>
      <div className="min-w-162.5 xl:min-w-full">
        {palette["data-primary"] && (
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={280}
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
