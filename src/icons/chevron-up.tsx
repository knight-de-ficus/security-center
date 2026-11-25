"use client";

import { ChevronUp } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ChevronUpIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ChevronUp}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="chevron--up"
      {...props}
    />
  );
}
