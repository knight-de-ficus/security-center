import FindingDetailExample from "@/components/others/ui-elements/overlays/finding-detail-example";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import { getTranslations, setRequestLocale } from "next-intl/server";
import OverlayExamples from "@/components/others/ui-elements/overlays";
export const metadata = { title: "overlays | VULN" };
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sidebar.items");
  return (
    <>
      <PageBreadcrumb pageTitle={t("overlayExamples")} />
      <OverlayExamples />
      <FindingDetailExample />
    </>
  );
}
