"use client";

import { useField } from "@/components/ui/field";
import { cn } from "@/utils";
import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

function Input({
  className,
  type,
  id,
  variant,
  ...props
}: React.ComponentProps<"input"> & { variant?: "security" }) {
  const field = useField();
  const resolvedId = id ?? field?.id;

  return (
    <InputPrimitive
      type={type}
      id={resolvedId}
      data-slot="input"
      aria-errormessage={
        field &&
        (props["aria-invalid"] === true || props["aria-invalid"] === "true")
          ? `${field.id}-error`
          : undefined
      }
      className={cn(
        "em-input em-control-default",
        className,
        variant === "security" && "sec-input",
      )}
      {...props}
    />
  );
}

export { Input };
