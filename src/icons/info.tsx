"use client";

import { Information } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function InfoIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Information}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="information"
      {...props}
    />
  );
}
