import PageBreadcrumb from "@/components/common/page-breadcrumb";
import { getTranslations, setRequestLocale } from "next-intl/server";
import NavigationExamples from "@/components/others/ui-elements/navigation";
export const metadata = { title: "navigation | VULN" };
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
      <PageBreadcrumb pageTitle={t("navigationExamples")} />
      <div id="navigation-specimens">
        <NavigationExamples />
      </div>
    </>
  );
}
