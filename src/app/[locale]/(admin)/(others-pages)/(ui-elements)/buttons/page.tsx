import PageBreadcrumb from "@/components/common/page-breadcrumb";
import ButtonSpecimens from "@/components/others/ui-elements/buttons/button-specimens";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button specification | TailAdmin",
  description:
    "Semantic button families, surface treatments and interaction states.",
};

export default async function Buttons({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("security.buttons");
  return (
    <div>
      <PageBreadcrumb pageTitle={t("title")} />
      <ButtonSpecimens />
    </div>
  );
}
