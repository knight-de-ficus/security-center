"use client";

import { ChevronDownIcon } from "@/icons";
import { cn } from "@/utils";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("em-accordion-item", className)}
      {...props}
    />
  );
}

function AccordionHeader({
  className,
  ...props
}: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={className}
      {...props}
    />
  );
}

interface AccordionTriggerProps extends AccordionPrimitive.Trigger.Props {
  showIcon?: boolean;
}

function AccordionTrigger({
  className,
  children,
  showIcon = true,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn("em-accordion-trigger", className)}
        {...props}
      >
        {children}
        {showIcon && (
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-in-out group-hover/accordion-trigger:text-foreground group-aria-expanded/accordion-trigger:rotate-180 group-data-panel-open/accordion-trigger:rotate-180 dark:text-gray-400 dark:group-hover/accordion-trigger:text-gray-300"
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-300 ease-in-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn("em-accordion-content", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
};
