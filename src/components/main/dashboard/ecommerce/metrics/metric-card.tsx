"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";
import { cn } from "@/utils";
import React from "react";

export interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  comparison?: string;
  direction?: "up" | "down";
  badge?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function MetricCard({
  icon,
  title,
  value,
  change,
  comparison,
  direction = "up",
  badge,
  className,
  children,
}: MetricCardProps) {
  return (
    <div data-columns={6} className={cn("em-module em-span-6", className)}>
      <div className="em-metric-icon">{icon}</div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="text-sm text-muted-foreground dark:text-gray-400">
            {title}
          </span>
          <h4 className="em-metric-value">{value}</h4>
        </div>

        {badge !== undefined ? (
          badge
        ) : change ? (
          <Badge color={direction === "down" ? "error" : "success"}>
            {direction === "down" ? (
              <ArrowDownIcon className="text-error-500" />
            ) : (
              <ArrowUpIcon />
            )}
            {change}
          </Badge>
        ) : null}
      </div>

      {comparison && <p className="em-metric-comparison">{comparison}</p>}
      {children}
    </div>
  );
}
