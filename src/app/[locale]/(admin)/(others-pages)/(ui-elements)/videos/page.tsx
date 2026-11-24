import { setRequestLocale } from "next-intl/server";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import VideoAspectRatioPreviews from "@/components/others/ui-elements/videos/aspect-ratio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Videos | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Videos page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function VideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideoAspectRatioPreviews />
    </div>
  );
}
