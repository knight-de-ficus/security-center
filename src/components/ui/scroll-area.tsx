"use client";

import { cn } from "@/utils";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  scrollbars?: "vertical" | "horizontal" | "both";
  viewportClassName?: string;
}

function ScrollArea({
  className,
  viewportClassName,
  scrollbars = "vertical",
  children,
  ...props
}: ScrollAreaProps) {
  const showVertical = scrollbars === "vertical" || scrollbars === "both";
  const showHorizontal = scrollbars === "horizontal" || scrollbars === "both";

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "em-scroll-viewport",
          scrollbars === "vertical" && "overflow-x-hidden",
          viewportClassName,
        )}
      >
        <ScrollAreaPrimitive.Content className="min-w-0">
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {showVertical && <ScrollBar orientation="vertical" />}
      {showHorizontal && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("em-scrollbar", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="em-scrollbar-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
