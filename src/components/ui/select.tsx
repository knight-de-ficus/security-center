"use client";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@/icons";
import { cn } from "@/utils";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import * as React from "react";
import { useField } from "@/components/ui/field";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SelectPortal({ ...props }: SelectPrimitive.Portal.Props) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("em-select-value", className)}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  id,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default" | "lg";
}) {
  const field = useField();
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      id={id ?? field?.id}
      aria-errormessage={
        field &&
        (props["aria-invalid"] === true || props["aria-invalid"] === "true")
          ? `${field.id}-error`
          : undefined
      }
      data-size={size}
      className={cn("em-input em-select", className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-hover/select-trigger:text-foreground group-data-popup-open/select-trigger:rotate-180 dark:text-gray-400 dark:group-hover/select-trigger:text-gray-300" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  positionerClassName,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & {
    positionerClassName?: string;
  }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className={cn("em-menu-positioner outline-none", positionerClassName)}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("em-select-popup", className)}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="flex flex-col gap-1 outline-none">
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  inset,
  ...props
}: SelectPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      data-inset={inset}
      className={cn("em-select-label", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  inset,
  ...props
}: SelectPrimitive.Item.Props & {
  inset?: boolean;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-inset={inset}
      className={cn("em-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <span className="em-select-indicator" data-slot="select-item-indicator">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("em-menu-separator", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "flex w-full cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-300 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "flex w-full cursor-default items-center justify-center py-1 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-300 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
