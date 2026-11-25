"use client";

import { ChartPie } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function PieChartIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ChartPie}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="chart--pie"
      {...props}
    />
  );
}
