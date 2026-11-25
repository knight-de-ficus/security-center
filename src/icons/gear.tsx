"use client";

import { Settings } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function GearIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Settings}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="settings"
      {...props}
    />
  );
}
