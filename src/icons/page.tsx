"use client";

import { Document } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function PageIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Document}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="document"
      {...props}
    />
  );
}
