import { setRequestLocale } from "next-intl/server";
import ComponentCard from "@/components/common/component-card";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import GhostVariant from "@/components/others/ui-elements/badges/ghost-variant";
import GhostVariantWithLeadingIcon from "@/components/others/ui-elements/badges/ghost-variant-with-leading-icon";
import GhostVariantWithTrailingIcon from "@/components/others/ui-elements/badges/ghost-variant-with-trailing-icon";
import LightVariant from "@/components/others/ui-elements/badges/light-variant";
import LightVariantWithLeadingIcon from "@/components/others/ui-elements/badges/light-variant-with-leading-icon";
import LightVariantWithTrailingIcon from "@/components/others/ui-elements/badges/light-variant-with-trailing-icon";
import SolidBadgeVariant from "@/components/others/ui-elements/badges/solid-variant";
import SolidVariantWithLeadingIcon from "@/components/others/ui-elements/badges/solid-variant-with-leading-icon";
import SolidVariantWithTrailingIcon from "@/components/others/ui-elements/badges/solid-variant-with-trailing-icon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Badge | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Badge page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function BadgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <PageBreadcrumb pageTitle="Badges" />
      <div className="em-grid">
        <ComponentCard columns={6} title="With Solid Background">
          <SolidBadgeVariant />
        </ComponentCard>

        <ComponentCard columns={6} title="With Light Background">
          <LightVariant />
        </ComponentCard>

        <ComponentCard columns={6} title="Ghost Variant">
          <GhostVariant />
        </ComponentCard>

        <ComponentCard columns={6} title="Solid Background with Leading Icon">
          <SolidVariantWithLeadingIcon />
        </ComponentCard>

        <ComponentCard columns={6} title="Light Background with Leading Icon">
          <LightVariantWithLeadingIcon />
        </ComponentCard>

        <ComponentCard columns={6} title="Ghost Variant with Leading Icon">
          <GhostVariantWithLeadingIcon />
        </ComponentCard>

        <ComponentCard columns={6} title="Solid Background with Trailing Icon">
          <SolidVariantWithTrailingIcon />
        </ComponentCard>

        <ComponentCard columns={6} title="Light Background with Trailing Icon">
          <LightVariantWithTrailingIcon />
        </ComponentCard>

        <ComponentCard columns={6} title="Ghost Variant with Trailing Icon">
          <GhostVariantWithTrailingIcon />
        </ComponentCard>
      </div>
    </div>
  );
}
