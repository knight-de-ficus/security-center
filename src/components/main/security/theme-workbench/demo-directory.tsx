"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/icons";

const pages = [
  "metric-styles",
  "security-components",
  "theme-settings",
  "buttons",
  "form-elements",
  "form-layout",
  "basic-tables",
  "alerts",
  "badge",
  "avatars",
  "images",
  "videos",
  "line-chart",
  "bar-chart",
  "calendar",
  "profile",
  "dashboard-widgets",
  "signin",
  "signup",
  "blank",
  "error-404",
] as const;
export default function DemoDirectory() {
  const t = useTranslations("security.workbench.directory");
  return (
    <section aria-labelledby="demo-directory-title">
      <h2 id="demo-directory-title" className="em-section-title">
        {t("title")}
      </h2>
      <nav className="em-grid" aria-label={t("title")}>
        {pages.map((path) => (
          <Link
            className="em-directory-link em-span-4"
            data-columns={4}
            key={path}
            href={`/${path}`}
          >
            <span>{t(path)}</span>
            <ArrowRightIcon className="size-4 rtl:rotate-180" />
          </Link>
        ))}
      </nav>
    </section>
  );
}
