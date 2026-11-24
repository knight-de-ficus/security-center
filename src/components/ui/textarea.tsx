"use client";

import { useField } from "@/components/ui/field";
import { cn } from "@/utils";
import * as React from "react";

function Textarea({
  className,
  id,
  ...props
}: React.ComponentProps<"textarea">) {
  const field = useField();
  const resolvedId = id ?? field?.id;

  return (
    <textarea
      id={resolvedId}
      data-slot="textarea"
      aria-errormessage={
        field &&
        (props["aria-invalid"] === true || props["aria-invalid"] === "true")
          ? `${field.id}-error`
          : undefined
      }
      className={cn("em-input em-textarea", className)}
      {...props}
    />
  );
}

export { Textarea };
