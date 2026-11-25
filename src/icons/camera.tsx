"use client";

import { Camera } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function CameraIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Camera}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="camera"
      {...props}
    />
  );
}
