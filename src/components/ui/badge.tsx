import { cn } from "@/utils";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva("em-badge", {
  variants: {
    variant: { light: "", solid: "em-badge-solid", ghost: "em-badge-ghost" },
    color: {
      primary: "em-status-primary",
      success: "em-status-success",
      error: "em-status-error",
      warning: "em-status-warning",
      info: "em-status-info",
      gray: "em-status-neutral",
      light: "em-status-neutral",
      dark: "em-status-neutral",
    },
    size: { sm: "em-badge-sm", default: "", lg: "em-badge-lg" },
  },
  defaultVariants: { variant: "light", color: "primary", size: "default" },
});

export interface BadgeProps
  extends
    Omit<useRender.ComponentProps<"span">, "color">,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant = "light",
  color = "primary",
  size = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ variant, color, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
      color,
      size,
    },
  });
}

export { Badge, badgeVariants };
