"use client";

import { Email } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function EnvelopeIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Email}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="email"
      {...props}
    />
  );
}
