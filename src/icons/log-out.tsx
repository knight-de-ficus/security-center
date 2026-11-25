"use client";

import { Logout } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function LogOutIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Logout}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="logout"
      {...props}
    />
  );
}
