"use client";

import { SidebarHeader } from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import withBasePath from "@/utils/with-base-path";

export default function AppSidebarHeader() {
  return (
    <SidebarHeader className="tailadmin-sidebar-brand px-5 pt-5 pb-8">
      <Link
        href="/"
        className="flex h-10 items-center justify-center"
        aria-label="Kdf"
      >
        <Image
          src={withBasePath("/images/brand/kdf_white.png")}
          width={800}
          height={500}
          alt=""
          className="tailadmin-sidebar-logo block"
          unoptimized
        />
      </Link>
    </SidebarHeader>
  );
}
