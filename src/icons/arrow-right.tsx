"use client";

import { ArrowRight } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";
import { cn } from "@/utils";

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <CarbonIcon
      icon={ArrowRight}
      size={20}
      width={20}
      height={20}
      data-carbon-icon="arrow--right"
      className={cn("rtl:rotate-180", className)}
      {...props}
    />
  );
}
