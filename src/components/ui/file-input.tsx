"use client";

import { useField } from "@/components/ui/field";
import { cn } from "@/utils";
import * as React from "react";

function FileInput({ className, id, ...props }: React.ComponentProps<"input">) {
  const field = useField();
  const resolvedId = id ?? field?.id;

  return (
    <input
      type="file"
      id={resolvedId}
      data-slot="file-input"
      className={cn("em-input em-file-input em-control-default", className)}
      {...props}
    />
  );
}

export { FileInput };
