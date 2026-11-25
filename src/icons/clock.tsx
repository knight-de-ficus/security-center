"use client";

import { Time } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ClockIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Time}
      size={20}
      width={18}
      height={18}
      data-carbon-icon="time"
      {...props}
    />
  );
}
