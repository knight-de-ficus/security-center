"use client";

import { Analytics } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function AnalyticsIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Analytics}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="analytics"
      {...props}
    />
  );
}
