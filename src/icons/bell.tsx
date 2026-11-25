"use client";

import { Notification } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function BellIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Notification}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="notification"
      {...props}
    />
  );
}
