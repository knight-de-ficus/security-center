"use client";

import { OverflowMenuVertical } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function VerticalDotsIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={OverflowMenuVertical}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="overflow-menu--vertical"
      {...props}
    />
  );
}
