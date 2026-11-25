"use client";

import { Sun } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function SunIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Sun}
      size={16}
      width={16}
      height={16}
      data-carbon-icon="sun"
      {...props}
    />
  );
}
