"use client";

import { Locked } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function LockIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Locked}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="locked"
      {...props}
    />
  );
}
