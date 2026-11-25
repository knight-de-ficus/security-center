"use client";

import { List } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function ListIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={List}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="list"
      {...props}
    />
  );
}
