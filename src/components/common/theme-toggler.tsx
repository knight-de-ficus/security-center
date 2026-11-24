"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";
import { MoonIcon, SunIcon } from "@/icons";
import { useTranslations } from "next-intl";

export default function ThemeToggler() {
  const { toggleTheme } = useTheme();
  const t = useTranslations("security");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={t("toggleTheme")}
    >
      <MoonIcon className="block dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </Button>
  );
}
