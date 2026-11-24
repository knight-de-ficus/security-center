import BusinessGallery from "@/components/main/security/business-gallery";
import { setRequestLocale } from "next-intl/server";
export const metadata = { title: "Security components | VULN" };
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BusinessGallery />;
}
