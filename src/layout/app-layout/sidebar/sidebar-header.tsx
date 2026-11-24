"use client";

import { SidebarHeader } from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils";
import { TailadminLogo, TailadminLogoMark } from "@/icons";

interface AppSidebarHeaderProps {
  showContent: boolean;
}

export default function AppSidebarHeader({
  showContent,
}: AppSidebarHeaderProps) {
  return (
    <SidebarHeader className="px-5 pt-5 pb-8">
      <Link
        href="/"
        className={cn(
          "flex items-center",
          !showContent ? "justify-center" : "justify-start",
        )}
      >
        {showContent ? (
          <TailadminLogo
            width={150}
            height={40}
            role="img"
            aria-label="TailAdmin"
          />
        ) : (
          <TailadminLogoMark
            width={32}
            height={32}
            role="img"
            aria-label="TailAdmin"
          />
        )}
      </Link>
    </SidebarHeader>
  );
}
