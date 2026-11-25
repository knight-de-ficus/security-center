"use client";

import { TrashCan } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function TrashBinIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={TrashCan}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="trash-can"
      {...props}
    />
  );
}
