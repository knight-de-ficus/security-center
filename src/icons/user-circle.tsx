"use client";

import { UserAvatar } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function UserCircleIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={UserAvatar}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="user--avatar"
      {...props}
    />
  );
}
