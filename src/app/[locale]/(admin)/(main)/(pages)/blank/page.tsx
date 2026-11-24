import { setRequestLocale } from "next-intl/server";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import BlankPageContent from "@/components/main/pages/blank-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blank Page | TailAdmin - Next.js Admin Dashboard Template",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function BlankPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <PageBreadcrumb pageTitle="Blank Page" />
      <BlankPageContent />
    </div>
  );
}
