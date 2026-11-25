"use client";

import { Edit } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function PencilIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Edit}
      size={24}
      width={21}
      height={21}
      data-carbon-icon="edit"
      {...props}
    />
  );
}
