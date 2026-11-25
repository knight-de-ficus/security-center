"use client";

import { Menu } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function MenuTwoIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Menu}
      size={16}
      width={16}
      height={12}
      data-carbon-icon="menu"
      {...props}
    />
  );
}
