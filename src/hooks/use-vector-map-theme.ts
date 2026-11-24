import { useTheme } from "@/context/theme-context";
import { useMemo } from "react";
import useThemeColors from "@/components/main/security/shared/use-theme-colors";

export interface VectorMapColors {
  regionFill: string;
  regionStroke: string;
  regionHover: string;
  markerFill: string;
  markerHover: string;
  markerStroke: string;
  tooltipBg: string;
  tooltipText: string;
  heatRamp: string[];
}

/**
 * Theme-aware jsvectormap style tokens. The library draws SVG with inline
 * attributes, so colors are passed as options rather than through global CSS.
 */
export function useVectorMapTheme() {
  const { theme } = useTheme();
  const palette = useThemeColors();

  return useMemo(() => {
    const isDark = theme === "dark";
    const colors: VectorMapColors = {
      regionFill: palette.border,
      regionStroke: palette.surface,
      regionHover: palette["data-primary"],
      markerFill: palette["data-primary"],
      markerHover: palette["data-secondary"],
      markerStroke: palette.surface,
      tooltipBg: palette.surface,
      tooltipText: palette.ink,
      heatRamp: [
        palette["heat-1"],
        palette["heat-2"],
        palette["heat-4"],
        palette["heat-5"],
      ],
    };

    const regionStyle = {
      initial: {
        fill: colors.regionFill,
        fillOpacity: 1,
        stroke: colors.regionStroke,
        strokeWidth: 0.5,
        strokeOpacity: 1,
      },
      hover: {
        fill: colors.regionHover,
        fillOpacity: 0.85,
        cursor: "pointer",
      },
      selected: { fill: colors.regionHover },
      selectedHover: {},
    };

    const markerStyle = {
      initial: {
        r: 5,
        fill: colors.markerFill,
        fillOpacity: 1,
        stroke: colors.markerStroke,
        strokeWidth: 2,
        strokeOpacity: 1,
      },
      hover: {
        fill: colors.markerHover,
        fillOpacity: 1,
        stroke: colors.markerStroke,
        strokeWidth: 2,
        cursor: "pointer",
      },
      selected: {},
      selectedHover: {},
    };

    return { isDark, colors, regionStyle, markerStyle };
  }, [theme, palette]);
}
