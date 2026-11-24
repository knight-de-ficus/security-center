import SecurityEditExample from "@/components/main/forms/form-layout/security-edit-example";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import BasicForm from "@/components/main/forms/form-layout/basic-form";
import ExampleForm from "@/components/main/forms/form-layout/example-form";
import ExampleFormTwo from "@/components/main/forms/form-layout/example-form-two";
import ExampleFormWithIcons from "@/components/main/forms/form-layout/example-form-with-icons";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata = { title: "Form layouts | VULN" };
export default async function FormLayoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("security.workbench.directory");
  return (
    <>
      <PageBreadcrumb pageTitle={t("form-layout")} />
      <div className="em-grid em-example-grid">
        <section data-columns={6} className="em-span-6 em-gallery-stack">
          <BasicForm />
          <ExampleFormWithIcons />
          <ExampleForm />
        </section>
        <section data-columns={6} className="em-span-6">
          <ExampleFormTwo />
        </section>
      </div>
      <SecurityEditExample />
    </>
  );
}
