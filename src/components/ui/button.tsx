import { cn } from "@/utils";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("em-button", {
  variants: {
    variant: {
      default: "em-button-primary",
      primary: "em-button-primary",
      neutral: "em-button-neutral",
      outline: "em-button-outline",
      ghost: "em-button-ghost",
      destructive: "em-button-destructive",
      "destructive-solid": "em-button-destructive-solid",
      link: "em-button-link",
      security: "em-button-primary",
      "security-outline": "em-button-outline",
      "security-ghost": "em-button-ghost",
      palette: "em-palette-choice",
    },
    surface: {
      default: "",
      brand: "em-button-on-brand",
    },
    size: {
      default: "em-control-default",
      xs: "em-control-compact",
      sm: "em-control-compact",
      lg: "em-control-touch",
      icon: "em-control-default em-button-icon",
      "icon-xs": "em-control-compact em-button-icon",
      "icon-sm": "em-control-compact em-button-icon",
      "icon-lg": "em-control-touch em-button-icon",
      palette: "em-palette-size",
    },
  },
  defaultVariants: { variant: "default", size: "default", surface: "default" },
});
function Button({
  className,
  variant = "default",
  size = "default",
  surface = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, surface, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
