"use client";

import { Attachment } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function PaperClipIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={Attachment}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="attachment"
      {...props}
    />
  );
}
