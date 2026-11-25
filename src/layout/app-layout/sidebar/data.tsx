import {
  AnalyticsIcon,
  BoxIcon,
  DataTableIcon,
  ListIcon,
  MeterIcon,
  PageIcon,
  PieChartIcon,
  TaskBlankIcon,
  ToolKitIcon,
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
        icon: <MeterIcon className="size-6" />,
        key: "securityOverview",
        path: "/",
      },
      {
        icon: <AnalyticsIcon className="size-6" />,
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
    type: "components",
    labelKey: "groups.components",
    items: [
      {
        icon: <BoxIcon className="size-6" />,
        key: "uiElements",
        subItems: [
          { key: "buttons", path: "/buttons" },
          { key: "avatar", path: "/avatars" },
          { key: "feedbackExamples", path: "/alerts" },
          { key: "overlayExamples", path: "/overlays" },
          { key: "navigationExamples", path: "/navigation" },
        ],
      },
      {
        icon: <TaskBlankIcon className="size-6" />,
        key: "forms",
        subItems: [
          { key: "formElements", path: "/form-elements" },
          { key: "formLayouts", path: "/form-layout" },
        ],
      },
      {
        icon: <DataTableIcon className="size-6" />,
        key: "basicTables",
        path: "/basic-tables",
      },
      {
        icon: <PieChartIcon className="size-6" />,
        key: "dataExamples",
        subItems: [
          { key: "dashboardSamples", path: "/dashboard-widgets" },
          { key: "metricStyles", path: "/metric-styles" },
          { key: "chartExamples", path: "/charts" },
          { key: "securityComponents", path: "/security-components" },
        ],
      },
      {
        icon: <PageIcon className="size-6" />,
        key: "pageSamples",
        subItems: [
          { key: "mediaExamples", path: "/media" },
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
        icon: <ToolKitIcon className="size-6" />,
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
