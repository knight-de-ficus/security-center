"use client";

import { DotMark } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function DotIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={DotMark}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="dot-mark"
      {...props}
    />
  );
}
