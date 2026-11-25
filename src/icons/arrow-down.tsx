"use client";

import { ArrowDown } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ArrowDownIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ArrowDown}
      size={16}
      width={12}
      height={12}
      data-carbon-icon="arrow--down"
      {...props}
    />
  );
}
