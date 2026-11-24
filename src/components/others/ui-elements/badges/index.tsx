"use client";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import GhostVariant from "@/components/others/ui-elements/badges/ghost-variant";
import GhostVariantWithLeadingIcon from "@/components/others/ui-elements/badges/ghost-variant-with-leading-icon";
import GhostVariantWithTrailingIcon from "@/components/others/ui-elements/badges/ghost-variant-with-trailing-icon";
import LightVariant from "@/components/others/ui-elements/badges/light-variant";
import LightVariantWithLeadingIcon from "@/components/others/ui-elements/badges/light-variant-with-leading-icon";
import LightVariantWithTrailingIcon from "@/components/others/ui-elements/badges/light-variant-with-trailing-icon";
import SolidBadgeVariant from "@/components/others/ui-elements/badges/solid-variant";
import SolidVariantWithLeadingIcon from "@/components/others/ui-elements/badges/solid-variant-with-leading-icon";
import SolidVariantWithTrailingIcon from "@/components/others/ui-elements/badges/solid-variant-with-trailing-icon";
export default function BadgeExamples() {
  const t = useTranslations("componentExamples");
  return (
    <div className="em-grid em-example-grid">
      <ComponentCard columns={6} title={t("badgeSolid")}>
        <SolidBadgeVariant />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeLight")}>
        <LightVariant />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeGhost")}>
        <GhostVariant />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeSolidLeading")}>
        <SolidVariantWithLeadingIcon />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeLightLeading")}>
        <LightVariantWithLeadingIcon />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeGhostLeading")}>
        <GhostVariantWithLeadingIcon />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeSolidTrailing")}>
        <SolidVariantWithTrailingIcon />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeLightTrailing")}>
        <LightVariantWithTrailingIcon />
      </ComponentCard>

      <ComponentCard columns={6} title={t("badgeGhostTrailing")}>
        <GhostVariantWithTrailingIcon />
      </ComponentCard>
    </div>
  );
}
