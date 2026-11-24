"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import PrimitiveGallery from "./primitive-gallery";
import FeedbackGallery from "./feedback-gallery";
import NavigationGallery from "./navigation-gallery";
import DemoDirectory from "./demo-directory";
import StructureGallery from "./structure-gallery";
import ButtonSpecimens from "@/components/others/ui-elements/buttons/button-specimens";
export default function ThemeWorkbench() {
  const t = useTranslations("security.workbench");
  return (
    <>
      <header className="sec-page-header">
        <h1>{t("title")}</h1>
        <Link
          href="/theme-settings"
          className={buttonVariants({ variant: "security-outline" })}
        >
          {t("settingsTitle")}
        </Link>
      </header>
      <nav className="em-workbench-nav" aria-label={t("sections")}>
        <a href="#button-specimens">{t("gallery.buttons")}</a>
        <a href="#primitive-specimens">{t("primitives")}</a>
        <a href="#feedback-specimens">{t("feedback")}</a>
        <a href="#navigation-specimens">{t("navigation")}</a>
        <Link href="/security-components">{t("businessTitle")}</Link>
      </nav>
      <DemoDirectory />
      <ButtonSpecimens />
      <PrimitiveGallery />
      <FeedbackGallery />
      <NavigationGallery />
      <StructureGallery />
    </>
  );
}
