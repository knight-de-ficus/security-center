"use client";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import { useTranslations } from "next-intl";
interface SecurityPageHeaderProps {
  page: "overview" | "trends" | "vulnerabilities";
  action?: React.ReactNode;
}
export default function SecurityPageHeader({
  page,
  action,
}: SecurityPageHeaderProps) {
  const t = useTranslations("security");
  return (
    <PageBreadcrumb
      variant="security"
      homeLabel={t("brandSub")}
      showBreadcrumb={false}
      pageTitle={t(`pages.${page}.title`)}
      action={action}
    />
  );
}
