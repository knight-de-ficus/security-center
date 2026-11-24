"use client";
import { useEffect, useState } from "react";
export default function useThemeColors() {
  const [colors, setColors] = useState<Record<string, string>>({});
  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      const names = [
        "data-primary",
        "data-secondary",
        "data-secondary-line",
        "data-violet",
        "data-soft",
        "data-category-1",
        "data-category-2",
        "data-category-3",
        "data-category-4",
        "data-context",
        "data-increase",
        "data-decrease",
        "heat-1",
        "heat-3",
        "heat-5",
        "muted",
        "border",
        "surface",
        "ink",
        "subtle",
        "positive",
        "critical",
        "high",
        "medium",
        "low",
        "heat-2",
        "heat-4",
      ];
      setColors({
        ...Object.fromEntries(
          names.map((name) => [
            name,
            style.getPropertyValue(`--color-sec-${name}`).trim(),
          ]),
        ),
        "font-family": getComputedStyle(document.body).fontFamily,
      });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-workspace-font"],
    });
    // Charts measure text themselves; refresh after the real font replaces fallback.
    document.fonts.addEventListener("loadingdone", read);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", read);
    };
  }, []);
  return colors;
}
