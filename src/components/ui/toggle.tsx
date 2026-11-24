"use client";

import { cn } from "@/utils";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

const toggleVariants = cva("em-button em-toggle", {
  variants: {
    variant: { default: "em-button-ghost", outline: "em-button-outline" },
    size: {
      default: "em-control-default",
      sm: "em-control-compact",
      xs: "em-control-compact",
      lg: "em-control-touch",
      icon: "em-control-default em-button-icon",
      "icon-sm": "em-control-compact em-button-icon",
      "icon-xs": "em-control-compact em-button-icon",
      "icon-lg": "em-control-touch em-button-icon",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
