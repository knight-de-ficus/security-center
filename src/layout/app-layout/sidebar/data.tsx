import {
  BoxIcon,
  LayoutGridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PluginIcon,
  TableIcon,
  UserCircleIcon,
} from "@/icons";
import type { MenuType, NavItem } from "./types";
export const menuSections: {
  type: MenuType;
  labelKey: string;
  items: NavItem[];
}[] = [
  {
    type: "business",
    labelKey: "groups.business",
    items: [
      {
        icon: <LayoutGridIcon className="size-6" />,
        key: "securityOverview",
        path: "/",
      },
      {
        icon: <PieChartIcon className="size-6" />,
        key: "securityTrends",
        path: "/trends",
      },
      {
        icon: <ListIcon className="size-6" />,
        key: "securityVulnerabilities",
        path: "/vulnerabilities",
      },
    ],
  },
  {
    type: "analytics",
    labelKey: "groups.analytics",
    items: [
      {
        icon: <BoxIcon className="size-6" />,
        key: "dashboardSamples",
        path: "/dashboard-widgets",
      },
      {
        icon: <PieChartIcon className="size-6" />,
        key: "chartSamples",
        subItems: [
          { key: "metricStyles", path: "/metric-styles" },
          { key: "lineChart", path: "/line-chart" },
          { key: "barChart", path: "/bar-chart" },
          { key: "securityComponents", path: "/security-components" },
        ],
      },
    ],
  },
  {
    type: "components",
    labelKey: "groups.components",
    items: [
      {
        icon: <LayoutGridIcon className="size-6" />,
        key: "componentWorkbench",
        path: "/design-system",
      },
      {
        icon: <ListIcon className="size-6" />,
        key: "forms",
        subItems: [
          { key: "formElements", path: "/form-elements" },
          { key: "formLayouts", path: "/form-layout" },
        ],
      },
      {
        icon: <TableIcon className="size-6" />,
        key: "tables",
        subItems: [{ key: "basicTables", path: "/basic-tables" }],
      },
      {
        icon: <BoxIcon className="size-6" />,
        key: "uiElements",
        subItems: [
          { key: "alerts", path: "/alerts" },
          { key: "avatar", path: "/avatars" },
          { key: "badge", path: "/badge" },
          { key: "buttons", path: "/buttons" },
          { key: "images", path: "/images" },
          { key: "videos", path: "/videos" },
        ],
      },
      {
        icon: <PageIcon className="size-6" />,
        key: "pageSamples",
        subItems: [
          { key: "calendar", path: "/calendar" },
          { key: "signIn", path: "/signin" },
          { key: "signUp", path: "/signup" },
          { key: "blankPage", path: "/blank" },
          { key: "error404", path: "/error-404" },
        ],
      },
    ],
  },
  {
    type: "settings",
    labelKey: "groups.settings",
    items: [
      {
        icon: <PluginIcon className="size-6" />,
        key: "themeSettings",
        path: "/theme-settings",
      },
      {
        icon: <UserCircleIcon className="size-6" />,
        key: "userProfile",
        path: "/profile",
      },
    ],
  },
];
