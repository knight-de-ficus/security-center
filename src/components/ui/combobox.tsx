"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CheckIcon, ChevronDownIcon, XIcon } from "@/icons";
import { cn } from "@/utils";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import * as React from "react";
import { useField } from "@/components/ui/field";

const Combobox = ComboboxPrimitive.Root;

function ComboboxPortal({ ...props }: ComboboxPrimitive.Portal.Props) {
  return <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props} />;
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("group/combobox-trigger em-combobox-trigger", className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 group-data-popup-open/combobox-trigger:rotate-180" />
        }
      />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({
  className,
  render,
  ...props
}: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
      render={
        render ?? (
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            className="em-muted-icon"
          >
            <XIcon className="pointer-events-none size-4" />
          </InputGroupButton>
        )
      }
    />
  );
}

function ComboboxInput({
  className,
  id,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  const field = useField();
  return (
    <InputGroup className={cn("w-full", className)}>
      <ComboboxPrimitive.Input
        id={id ?? field?.id}
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  positionerClassName,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  anchor,
  children,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  > & {
    positionerClassName?: string;
  }) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={cn("em-menu-positioner outline-none", positionerClassName)}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn("em-select-popup em-combobox-popup", className)}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar flex max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 flex-col gap-1 overflow-y-auto overscroll-contain outline-none data-empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  inset,
  ...props
}: ComboboxPrimitive.Item.Props & {
  inset?: boolean;
}) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-inset={inset}
      className={cn("group/combobox-item em-select-item", className)}
      {...props}
    >
      <span className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {children}
      </span>
      <span
        className="em-data-ink pointer-events-none absolute inset-e-3 flex items-center justify-center"
        data-slot="combobox-item-indicator"
      >
        <ComboboxPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ComboboxPrimitive.ItemIndicator>
      </span>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxItemIndicator({
  className,
  children,
  ...props
}: ComboboxPrimitive.ItemIndicator.Props) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      className={cn("size-4 text-brand-500 dark:text-brand-400", className)}
      {...props}
    >
      {children || <CheckIcon className="size-4" />}
    </ComboboxPrimitive.ItemIndicator>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  inset,
  ...props
}: ComboboxPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      data-inset={inset}
      className={cn("em-select-label", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("em-combobox-empty", className)}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("em-menu-separator", className)}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn("em-combobox-chips", className)}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn("em-combobox-chip", className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="inline-flex items-center justify-center text-gray-400 transition-colors hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
          data-slot="combobox-chip-remove"
          render={
            <Button variant="ghost" size="icon-xs" className="em-chip-remove">
              <XIcon className="pointer-events-none size-3.5" />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("em-combobox-chips-input", className)}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
