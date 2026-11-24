"use client";

import { useField } from "@/components/ui/field";
import { CheckIcon } from "@/icons";
import { cn } from "@/utils";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

function Checkbox({ className, id, ...props }: CheckboxPrimitive.Root.Props) {
  const field = useField();
  const resolvedId = id ?? field?.id;

  return (
    <CheckboxPrimitive.Root
      id={resolvedId}
      data-slot="checkbox"
      className={cn("em-check", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
