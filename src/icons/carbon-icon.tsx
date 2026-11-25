"use client";

import type { CarbonIconType } from "@carbon/icons-react";
import type { IconProps } from ".";

interface CarbonIconProps extends IconProps {
  icon: CarbonIconType;
  size: number;
}

export default function CarbonIcon({
  icon: Icon,
  size,
  fill,
  style,
  ...props
}: CarbonIconProps) {
  return (
    <Icon
      size={size}
      aria-hidden={
        props["aria-label"] || props["aria-labelledby"] || props.role
          ? undefined
          : true
      }
      {...props}
      style={{ fill: fill ?? "currentColor", stroke: "none", ...style }}
    />
  );
}
