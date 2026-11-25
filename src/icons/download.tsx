"use client";

import { Download } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function DownloadIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Download}
      size={20}
      width={18}
      height={18}
      data-carbon-icon="download"
      {...props}
    />
  );
}
