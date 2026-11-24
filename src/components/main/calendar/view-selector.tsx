"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ChevronDownIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import React from "react";
import { createPortal } from "react-dom";
import { CALENDAR_VIEW_OPTIONS } from "./types";

export interface CalendarViewSelectProps {
  currentView: string;
  onViewChange: (viewKey: string) => void;
  portalNode: Element | null;
}

export default function CalendarViewSelect({
  currentView,
  onViewChange,
  portalNode,
}: CalendarViewSelectProps) {
  const activeOption =
    CALENDAR_VIEW_OPTIONS.find((v) => v.key === currentView) ||
    CALENDAR_VIEW_OPTIONS.find((v) => v.key === "dayGridMonth") ||
    CALENDAR_VIEW_OPTIONS[1];

  if (!portalNode) return null;

  return createPortal(
    <div className="calendar-view-dropdown relative">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" />}
          className="calendar-view-btn"
        >
          <span className="calendar-view-label">{activeOption.label}</span>
          <ChevronDownIcon className="calendar-view-chevron h-4 w-4 transition-transform duration-200 group-data-popup-open:rotate-180 sm:h-4.5 sm:w-4.5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="bottom"
          sideOffset={6}
          className="calendar-view-menu"
        >
          {CALENDAR_VIEW_OPTIONS.map((view) => (
            <DropdownMenuItem
              key={view.key}
              data-view-key={view.key}
              onClick={() => onViewChange(view.key)}
              data-active={currentView === view.key}
            >
              {view.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>,
    portalNode,
  );
}
