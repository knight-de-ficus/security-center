"use client";

import { SettingsAdjust } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function HorizontalSlideIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={SettingsAdjust}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="settings--adjust"
      {...props}
    />
  );
}
