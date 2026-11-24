import PageBreadcrumb from "@/components/common/page-breadcrumb";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ComponentCard from "@/components/common/component-card";
import ResponsiveImage from "@/components/others/ui-elements/images/responsive";
import TwoColumnImageGrid from "@/components/others/ui-elements/images/two-column-grid";
import ThreeColumnImageGrid from "@/components/others/ui-elements/images/three-column-greed";
import VideoAspectRatioPreviews from "@/components/others/ui-elements/videos/aspect-ratio";
export const metadata = { title: "media | VULN" };
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
      <PageBreadcrumb pageTitle={t("mediaExamples")} />
      <div className="em-gallery-stack">
        <ComponentCard title={t("images")}>
          <div className="em-gallery-stack">
            <ResponsiveImage />
            <TwoColumnImageGrid />
            <ThreeColumnImageGrid />
          </div>
        </ComponentCard>
        <VideoAspectRatioPreviews />
      </div>
    </>
  );
}
