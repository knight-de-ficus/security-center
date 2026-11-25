"use client";

import { Earth } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function GlobeIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Earth}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="earth"
      {...props}
    />
  );
}
