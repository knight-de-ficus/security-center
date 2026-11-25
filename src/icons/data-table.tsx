"use client";

import { DataTable } from "@carbon/icons-react";
import type { IconProps } from ".";
import CarbonIcon from "./carbon-icon";

export function DataTableIcon(props: IconProps) {
  return (
    <CarbonIcon
      icon={DataTable}
      size={24}
      width={24}
      height={24}
      data-carbon-icon="data-table"
      {...props}
    />
  );
}
