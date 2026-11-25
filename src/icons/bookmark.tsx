"use client";

import { BookmarkFilled } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function BookmarkIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={BookmarkFilled}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="bookmark--filled"
      {...props}
    />
  );
}
