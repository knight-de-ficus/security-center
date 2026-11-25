"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useSidebar } from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { HorizontalDotsIcon, MenuTwoIcon, SearchIcon, XIcon } from "@/icons";
import NotificationDropdown from "@/layout/header/notification-dropdown";
import ThemeToggleButton from "@/layout/header/theme-toggler";
import UserDropdown from "@/layout/header/user-dropdown";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { TailadminLogo } from "@/icons";
import { useEffect, useRef, useState } from "react";

export default function AppHeader() {
  const t = useTranslations("header");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { openMobile, toggleSidebar } = useSidebar();

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      data-tailadmin-header
      className="sticky top-0 z-50 flex w-full shrink-0 border-gray-200 bg-background xl:border-b dark:border-border dark:bg-background"
    >
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
        {/* Left side content */}
        <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 xl:py-4 dark:border-border">
          <Button
            variant="outline"
            size="icon"
            className="tailadmin-header-toggle text-muted-foreground lg:size-11 dark:text-gray-400"
            onClick={toggleSidebar}
            aria-label={t("toggleSidebar")}
          >
            {openMobile ? (
              <XIcon className="size-6" />
            ) : (
              <MenuTwoIcon className="size-6 rtl:-scale-x-100" />
            )}
          </Button>

          <Link href="/" className="xl:hidden">
            <TailadminLogo
              width={154}
              height={32}
              role="img"
              aria-label="TailAdmin"
            />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleApplicationMenu}
            aria-label="Toggle application menu"
            className="em-header-mobile-menu"
          >
            <HorizontalDotsIcon />
          </Button>

          <div className="hidden xl:block">
            <form onSubmit={(e) => e.preventDefault()}>
              <Field className="xl:w-107.5">
                <InputGroup className="border-gray-200 bg-transparent dark:border-border dark:bg-background">
                  <InputGroupAddon align="inline-start">
                    <SearchIcon className="size-5 text-muted-foreground dark:text-gray-400" />
                  </InputGroupAddon>
                  <InputGroupInput
                    ref={inputRef}
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    className="text-foreground placeholder:text-muted-foreground dark:text-foreground dark:placeholder:text-muted-foreground"
                  />
                  <InputGroupAddon align="inline-end">
                    <Badge
                      variant="light"
                      color="gray"
                      size="sm"
                      className="cursor-pointer gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-1.75 py-1 text-xs tracking-normal text-muted-foreground shadow-none dark:border-border dark:bg-background dark:text-gray-400"
                    >
                      <span>⌘</span>
                      <span>K</span>
                    </Badge>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </form>
          </div>
        </div>

        {/* Right side content */}
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md xl:flex xl:justify-end xl:px-0 xl:shadow-none",
            isApplicationMenuOpen ? "flex" : "hidden",
          )}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggleButton />

            <NotificationDropdown />
          </div>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
