"use client";

import { Upload } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function UploadIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Upload}
      size={20}
      width={18}
      height={18}
      data-carbon-icon="upload"
      {...props}
    />
  );
}
