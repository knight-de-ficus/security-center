"use client";

import { ArrowUp } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ArrowUpIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ArrowUp}
      size={16}
      width={13}
      height={12}
      data-carbon-icon="arrow--up"
      {...props}
    />
  );
}
