"use client";

import { Search } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function SearchIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Search}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="search"
      {...props}
    />
  );
}
