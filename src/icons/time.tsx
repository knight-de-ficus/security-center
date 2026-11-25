"use client";

import { Time } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function TimeIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Time}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="time"
      {...props}
    />
  );
}
