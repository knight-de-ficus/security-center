"use client";

import { Add } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function PlusIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Add}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="add"
      {...props}
    />
  );
}
