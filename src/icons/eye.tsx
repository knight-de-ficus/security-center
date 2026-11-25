"use client";

import { View } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function EyeIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={View}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="view"
      {...props}
    />
  );
}
