"use client";

import { Moon } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function MoonIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Moon}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="moon"
      {...props}
    />
  );
}
