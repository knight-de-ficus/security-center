"use client";

import { Cube } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function BoxIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Cube}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="cube"
      {...props}
    />
  );
}
