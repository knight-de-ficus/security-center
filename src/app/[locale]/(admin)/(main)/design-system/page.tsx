import ThemeWorkbench from "@/components/main/security/theme-workbench";
import { setRequestLocale } from "next-intl/server";
export const metadata = { title: "Component workbench | VULN" };
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThemeWorkbench />;
}
