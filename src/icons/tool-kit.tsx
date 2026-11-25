"use client";

import { ToolKit } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ToolKitIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={ToolKit}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="tool-kit"
      {...props}
    />
  );
}
