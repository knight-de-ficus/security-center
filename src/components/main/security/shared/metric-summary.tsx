"use client";
import type { ReactNode, PointerEvent } from "react";
import type { MetricAppearance } from "@/utils/metric-appearance";
import { cn } from "@/utils";
interface MetricSummaryProps {
  label: string;
  items: { label: string; value: string; unit: string; lead?: boolean }[];
  context?: ReactNode;
  footer?: ReactNode;
  compact?: boolean;
  appearance?: MetricAppearance;
}
export default function MetricSummary({
  label,
  items,
  context,
  footer,
  compact = false,
  appearance,
}: MetricSummaryProps) {
  function moveReflection(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--metric-pointer-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--metric-pointer-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  }
  return (
    <section
      data-columns={12}
      data-appearance={appearance}
      className={cn(
        "sec-band sec-metric-surface",
        compact && "sec-metric-compact",
      )}
      aria-label={label}
      onPointerMove={moveReflection}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--metric-pointer-x");
        event.currentTarget.style.removeProperty("--metric-pointer-y");
      }}
    >
      {context && <div className="sec-band-context">{context}</div>}
      <dl className="sec-band-metrics">
        {items.map((item) => (
          <div
            key={item.label}
            data-columns={3}
            className={`sec-band-metric ${item.lead && !compact ? "sec-band-lead" : "sec-band-compact"}`}
          >
            <dt>{item.label}</dt>
            <dd>
              {item.value}
              <small>{item.unit}</small>
            </dd>
          </div>
        ))}
      </dl>
      {footer && <div className="sec-band-summary">{footer}</div>}
    </section>
  );
}
