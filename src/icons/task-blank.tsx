"use client";

import { TaskBlank } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function TaskBlankIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={TaskBlank}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="task--blank"
      {...props}
    />
  );
}
