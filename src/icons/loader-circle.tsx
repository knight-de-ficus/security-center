"use client";

import { Incomplete } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function LoaderCircleIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Incomplete}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="incomplete"
      {...props}
    />
  );
}
