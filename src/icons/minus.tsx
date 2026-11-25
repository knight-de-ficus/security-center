"use client";

import { Subtract } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function MinusIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Subtract}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="subtract"
      {...props}
    />
  );
}
