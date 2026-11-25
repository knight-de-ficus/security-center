"use client";

import { ChevronDown } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ChevronDownIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ChevronDown}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="chevron--down"
      {...props}
    />
  );
}
