"use client";

import { ViewOff } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function EyeCloseIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ViewOff}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="view--off"
      {...props}
    />
  );
}
