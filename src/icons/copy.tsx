"use client";

import { Copy } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function CopyIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Copy}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="copy"
      {...props}
    />
  );
}
