"use client";

import { ChevronLeft } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ChevronLeftIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ChevronLeft}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="chevron--left"
      {...props}
    />
  );
}
