import ThemeSettings from "@/components/main/security/theme-settings";
import { setRequestLocale } from "next-intl/server";
export const metadata = { title: "Theme settings | VULN" };
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemeSettings />;
}
