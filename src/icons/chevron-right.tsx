"use client";

import { ChevronRight } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ChevronRightIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ChevronRight}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="chevron--right"
      {...props}
    />
  );
}
