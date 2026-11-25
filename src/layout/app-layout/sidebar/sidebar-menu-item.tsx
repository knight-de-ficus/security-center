"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuItem as UiSidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { ChevronDownIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import SidebarSubmenuItem from "./sidebar-submenu-item";
import { NavItem } from "./types";

interface SidebarMenuItemProps {
  nav: NavItem;
  isOpen: boolean;
  showContent: boolean;
  pathname: string;
  onToggle: () => void;
}

export default function SidebarMenuItem({
  nav,
  isOpen,
  showContent,
  pathname,
  onToggle,
}: SidebarMenuItemProps) {
  const t = useTranslations("sidebar");

  const hasSubItems = Boolean(nav.subItems?.length);
  const hasActiveChild = Boolean(
    nav.subItems?.some(
      (subItem) =>
        subItem.path === pathname ||
        (subItem.path === "/ai-settings" &&
          pathname.startsWith("/ai-settings")),
    ),
  );
  const isDirectActive = Boolean(nav.path && nav.path === pathname);
  const isItemActive = hasSubItems ? isOpen || hasActiveChild : isDirectActive;
  const textVisibility = showContent ? "opacity-100" : "opacity-0";

  return (
    <UiSidebarMenuItem>
      {hasSubItems ? (
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger
            aria-label={t(`items.${nav.key}`)}
            className={cn(
              "group menu-item h-10 justify-start overflow-hidden cursor-pointer",
              isItemActive ? "menu-item-active" : "menu-item-inactive",
            )}
          >
            <span
              className={cn(
                "shrink-0",
                isItemActive
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive",
              )}
            >
              {nav.icon}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "menu-item-text pointer-events-none absolute start-12 whitespace-nowrap transition-opacity duration-150 motion-reduce:transition-none",
                textVisibility,
              )}
            >
              {t(`items.${nav.key}`)}
            </span>
            {nav.new && (
              <span
                className={cn(
                  "absolute inset-e-10 ms-auto menu-dropdown-badge transition-opacity duration-150 motion-reduce:transition-none",
                  textVisibility,
                  isItemActive
                    ? "menu-dropdown-badge-active"
                    : "menu-dropdown-badge-inactive",
                )}
              >
                {t("badges.new")}
              </span>
            )}
            <ChevronDownIcon
              className={cn(
                "absolute end-3 size-5 shrink-0 transition-[opacity,transform] duration-150 motion-reduce:transition-none",
                textVisibility,
                isOpen ? "rotate-180 text-brand-500" : "",
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul
              aria-hidden={!showContent}
              inert={!showContent}
              className={cn(
                "ms-9 mt-2 space-y-1 transition-opacity duration-150 motion-reduce:transition-none",
                textVisibility,
              )}
            >
              {nav.subItems?.map((subItem) => (
                <SidebarSubmenuItem
                  key={subItem.key}
                  subItem={subItem}
                  isActive={
                    subItem.path === pathname ||
                    (subItem.path === "/ai-settings" &&
                      pathname.startsWith("/ai-settings"))
                  }
                />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        nav.path && (
          <Link
            href={nav.path}
            aria-label={t(`items.${nav.key}`)}
            aria-current={isDirectActive ? "page" : undefined}
            target={nav.target}
            className={cn(
              "group menu-item h-10 justify-start overflow-hidden",
              isItemActive ? "menu-item-active" : "menu-item-inactive",
            )}
          >
            <span
              className={cn(
                "shrink-0",
                isItemActive
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive",
              )}
            >
              {nav.icon}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "menu-item-text pointer-events-none absolute start-12 whitespace-nowrap transition-opacity duration-150 motion-reduce:transition-none",
                textVisibility,
              )}
            >
              {t(`items.${nav.key}`)}
            </span>
          </Link>
        )
      )}
    </UiSidebarMenuItem>
  );
}
