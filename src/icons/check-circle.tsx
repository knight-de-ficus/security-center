"use client";

import { CheckmarkOutline } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function CheckCircleIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={CheckmarkOutline}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="checkmark--outline"
      {...props}
    />
  );
}
