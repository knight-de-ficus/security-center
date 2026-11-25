"use client";

import { Calendar } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function CalendarIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Calendar}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="calendar"
      {...props}
    />
  );
}
