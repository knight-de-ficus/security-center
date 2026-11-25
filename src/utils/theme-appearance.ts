import type { WorkspaceFont } from "./workspace-font";
import type { MetricAppearance } from "./metric-appearance";

export const radiusGroups = [
  "card",
  "control",
  "dialog",
  "band",
  "small",
  "full",
] as const;
export type RadiusGroup = (typeof radiusGroups)[number];
export interface ThemeAppearance {
  font: WorkspaceFont;
  metric: MetricAppearance;
  radii: Record<RadiusGroup, string>;
}
export const defaultRadii = {
  card: "6px",
  control: "4px",
  dialog: "8px",
  band: "4px",
  small: "2px",
  full: "50%",
};
export const themeAppearances: Record<
  "default" | "tenable" | "rapid7",
  ThemeAppearance
> = {
  default: { font: "misans", metric: "plain", radii: defaultRadii },
  tenable: {
    font: "harmony",
    metric: "contrast",
    radii: {
      card: "0px",
      control: "0px",
      dialog: "0px",
      band: "0px",
      small: "0px",
      full: "0px",
    },
  },
  rapid7: { font: "misans", metric: "gradient", radii: defaultRadii },
};

export function validatedAppearance(
  value: unknown,
): ThemeAppearance | undefined {
  if (!value || typeof value !== "object") return;
  const data = value as ThemeAppearance;
  if (
    !["misans", "oppo", "harmony", "original"].includes(data.font) ||
    !["contrast", "gradient", "plain"].includes(data.metric)
  )
    return;
  return {
    font: data.font,
    metric: data.metric,
    radii: Object.fromEntries(
      radiusGroups.map((group) => {
        const radius = data.radii?.[group];
        return [
          group,
          typeof radius === "string" &&
          /^(?:\d+(?:\.\d+)?)(?:px|%)$/.test(radius)
            ? radius
            : defaultRadii[group],
        ];
      }),
    ) as Record<RadiusGroup, string>,
  };
}
