import { setRequestLocale } from "next-intl/server";
import Error404 from "@/components/main/pages/error-404";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Error 404 Page | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Error 404 page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function Error404Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Error404 />;
}
