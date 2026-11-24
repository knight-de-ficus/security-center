"use client";
import { useRef } from "react";
import useCardElevation from "@/hooks/use-card-elevation";
import { useTranslations } from "next-intl";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/layout/app-layout/sidebar";
import AppHeader from "@/layout/app-layout/header";
import { ArrowUpIcon } from "@/icons";
export default function SecurityShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("security");
  const rootRef = useRef<HTMLDivElement>(null);
  useCardElevation(rootRef);
  return (
    <SidebarProvider ref={rootRef} className="security-app tailadmin-shell">
      <a href="#security-main" className="sec-skip">
        {t("skip")}
      </a>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div
          id="security-main"
          className="mx-auto w-full max-w-(--breakpoint-2xl) min-w-0 p-4 md:p-6"
        >
          {children}
          <footer className="sec-footer">
            <span>{t("footer")}</span>
            <a href="#security-main">
              {t("backTop")}
              <ArrowUpIcon className="size-3" />
            </a>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
