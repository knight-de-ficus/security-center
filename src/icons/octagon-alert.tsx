"use client";

import { WarningHex } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function OctagonAlertIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={WarningHex}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="warning--hex"
      {...props}
    />
  );
}
