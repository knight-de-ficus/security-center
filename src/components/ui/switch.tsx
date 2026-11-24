"use client";

import { cn } from "@/utils";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { useField } from "@/components/ui/field";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  size?: "sm" | "default";
}

function Switch({ className, id, size = "default", ...props }: SwitchProps) {
  const field = useField();
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      id={id ?? field?.id}
      data-size={size}
      className={cn("em-switch", className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="em-switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
