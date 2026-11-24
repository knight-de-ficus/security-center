"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn("em-input-group", className)}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva("em-input-addon", {
  variants: {
    align: {
      "inline-start":
        "order-first ps-3.5 has-[>button]:-ms-1 has-[>kbd]:-ms-0.5",
      "inline-end": "order-last pe-3.5 has-[>button]:-me-1 has-[>kbd]:-me-0.5",
      "block-start":
        "order-first w-full justify-start ps-4 pe-4 pt-2.5 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-2",
      "block-end":
        "order-last w-full justify-start ps-4 pe-4 pb-2.5 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-2",
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
});

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement
          ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            "input, textarea",
          )
          ?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("em-input-group-button", {
  variants: {
    size: {
      xs: "em-control-compact",
      sm: "em-control-compact",
      "icon-xs": "em-control-compact em-button-icon",
      "icon-sm": "em-control-compact em-button-icon",
    },
  },
  defaultVariants: { size: "xs" },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      size="sm"
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("em-input-addon-text", className)} {...props} />;
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn("em-group-control", className)}
      {...props}
    />
  );
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn("em-group-control", className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
