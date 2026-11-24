"use client";

import { cn } from "@/utils";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn("em-separator", className)}
      {...props}
    />
  );
}

export { Separator };
