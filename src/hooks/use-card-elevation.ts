"use client";
import { useEffect, type RefObject } from "react";
const cardSelector =
  ".sec-panel,.em-card,.em-module,.sec-analysis-band,.sec-band,.sec-register,.em-table-frame,.sec-analysis-pair";
export default function useCardElevation(
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let active: HTMLElement | null = null;
    const reset = () => {
      if (active) {
        active.removeAttribute("data-card-hover");
        active.style.removeProperty("--card-shadow-x");
        active.style.removeProperty("--card-shadow-y");
        active = null;
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const found =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(cardSelector)
          : null;
      const card = found?.parentElement?.matches(".sec-analysis-pair")
        ? found.parentElement
        : found;
      if (!card || !root.contains(card)) {
        reset();
        return;
      }
      if (card !== active) {
        reset();
        active = card;
        active.dataset.cardHover = "true";
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = card.getBoundingClientRect();
      const x = Math.max(
        -0.5,
        Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
      );
      const y = Math.max(
        -0.5,
        Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
      );
      card.style.setProperty("--card-shadow-x", `${(x * 12).toFixed(1)}px`);
      card.style.setProperty("--card-shadow-y", `${(8 + y * 8).toFixed(1)}px`);
    };
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", reset);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [rootRef]);
}
