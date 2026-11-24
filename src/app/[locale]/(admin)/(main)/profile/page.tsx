import { setRequestLocale } from "next-intl/server";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import AddressSection from "@/components/main/profile/address";
import DangerZone from "@/components/main/profile/danger";
import PersonalInformationSection from "@/components/main/profile/personal-information";
import SecuritySection from "@/components/main/profile/security/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | TailAdmin - Next.js Admin Dashboard Template",
  description:
    "Manage your personal information, security settings, and preference on the TailAdmin Profile page.",
};

export default async function Profile({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <PageBreadcrumb pageTitle="Profile" />
      <div className="em-grid">
        <div data-columns={12} className="em-span-12 em-gallery-stack">
          <PersonalInformationSection />
          <AddressSection />
          <SecuritySection />
          <DangerZone />
        </div>
      </div>
    </div>
  );
}
