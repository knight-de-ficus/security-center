"use client";

import { Group } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function UsersIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Group}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="group"
      {...props}
    />
  );
}
