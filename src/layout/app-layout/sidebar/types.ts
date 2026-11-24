import React from "react";

export type MenuType = "business" | "components" | "settings";

export interface SubItem {
  key: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  target?: string;
}

export interface NavItem {
  key: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  target?: string;
  subItems?: SubItem[];
}
