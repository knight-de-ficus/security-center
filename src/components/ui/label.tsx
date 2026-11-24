"use client";

import { cn } from "@/utils";
import * as React from "react";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label data-slot="label" className={cn("em-label", className)} {...props} />
  );
}

export { Label };
