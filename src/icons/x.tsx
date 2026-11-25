"use client";

import { Close } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function XIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Close}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="close"
      {...props}
    />
  );
}
