"use client";

import { Send } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function SendIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Send}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="send"
      {...props}
    />
  );
}
