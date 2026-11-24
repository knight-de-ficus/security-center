import RiskLabels from "@/components/others/ui-elements/feedback-states/risk-labels";
import FeedbackStates from "@/components/others/ui-elements/feedback-states";
import BadgeExamples from "@/components/others/ui-elements/badges";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ComponentCard from "@/components/common/component-card";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import DefaultAlert from "@/components/others/ui-elements/alerts/default-alert";
import ErrorAlert from "@/components/others/ui-elements/alerts/error-alert";
import InfoAlert from "@/components/others/ui-elements/alerts/info-alert";
import SuccessAlert from "@/components/others/ui-elements/alerts/success-alert";
import WarningAlert from "@/components/others/ui-elements/alerts/warning-alert";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Alerts | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Alerts page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default async function Alerts({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sidebar.items");
  const examples = await getTranslations("componentExamples");
  return (
    <div>
      <PageBreadcrumb pageTitle={t("feedbackExamples")} />
      <div className="em-grid">
        <ComponentCard columns={12} title={examples("alertDefault")}>
          <DefaultAlert />
        </ComponentCard>
        <ComponentCard columns={12} title={examples("alertSuccess")}>
          <SuccessAlert />
        </ComponentCard>
        <ComponentCard columns={12} title={examples("alertWarning")}>
          <WarningAlert />
        </ComponentCard>
        <ComponentCard columns={12} title={examples("alertError")}>
          <ErrorAlert />
        </ComponentCard>
        <ComponentCard columns={12} title={examples("alertInfo")}>
          <InfoAlert />
        </ComponentCard>
      </div>
      <BadgeExamples />
      <FeedbackStates />
      <RiskLabels />
    </div>
  );
}
