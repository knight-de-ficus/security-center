"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import SidebarMenuItem from "./sidebar-menu-item";
import { MenuType, NavItem } from "./types";

interface SidebarNavGroupProps {
  labelKey: string;
  menuType: MenuType;
  items: NavItem[];
  openSubmenu: { type: MenuType; index: number } | null;
  showContent: boolean;
  pathname: string;
  onToggleSubmenu: (index: number, menuType: MenuType) => void;
}

export default function SidebarNavGroup({
  labelKey,
  menuType,
  items,
  openSubmenu,
  showContent,
  pathname,
  onToggleSubmenu,
}: SidebarNavGroupProps) {
  const t = useTranslations("sidebar");

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel
        className={cn(
          "relative mb-4 flex h-5 overflow-hidden p-0 text-xs leading-5 whitespace-nowrap text-gray-400 uppercase group-data-[collapsible=icon]/sidebar:mt-0 group-data-[collapsible=icon]/sidebar:opacity-100",
        )}
      >
        <span
          className={cn(
            "absolute start-0 transition-opacity duration-150 motion-reduce:transition-none",
            showContent ? "opacity-100" : "opacity-0",
          )}
        >
          {t(labelKey)}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "tailadmin-sidebar-divider absolute h-px w-5 bg-border transition-opacity duration-150 motion-reduce:transition-none dark:bg-border",
            showContent ? "opacity-0" : "opacity-100",
          )}
        />
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((nav, index) => (
          <SidebarMenuItem
            key={nav.key}
            nav={nav}
            isOpen={
              openSubmenu?.type === menuType && openSubmenu?.index === index
            }
            showContent={showContent}
            pathname={pathname}
            onToggle={() => onToggleSubmenu(index, menuType)}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
