import PriorityList from "@/components/main/security/overview/priority-list";
import Vulnerabilities from "@/components/main/security/vulnerabilities";
import {
  initialVulnerabilities,
  isActive,
} from "@/components/main/security/data";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ComponentCard from "@/components/common/component-card";
import PageBreadcrumb from "@/components/common/page-breadcrumb";
import TableFive from "@/components/main/tables/basic-tables/table-five";
import TableFour from "@/components/main/tables/basic-tables/table-four";
import TableOne from "@/components/main/tables/basic-tables/table-one";
import TableThree from "@/components/main/tables/basic-tables/table-three";
import TableTwo from "@/components/main/tables/basic-tables/table-two";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Basic Data Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Data Table page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function BasicTables({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("businessExamples");
  const priority = initialVulnerabilities
    .filter((v) => isActive(v) && v.severity === "critical")
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 4);
  return (
    <div>
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="em-grid">
        <ComponentCard columns={12} title="Basic Table 1">
          <TableOne />
        </ComponentCard>
        <ComponentCard columns={12} title="Basic Table 2">
          <TableTwo />
        </ComponentCard>
        <ComponentCard columns={12} title="Basic Table 3">
          <TableThree />
        </ComponentCard>
        <ComponentCard columns={12} title="Basic Table 4">
          <TableFour />
        </ComponentCard>
        <ComponentCard columns={12} title="Basic Table 5">
          <TableFive />
        </ComponentCard>
      </div>
      <section id="priority-list">
        <PriorityList items={priority} />
      </section>
      <section id="vulnerability-register" className="em-gallery-stack">
        <h2 className="em-section-title">{t("register")}</h2>
        <p className="em-description">{t("registerDescription")}</p>
        <Vulnerabilities embedded pageSize={5} />
      </section>
    </div>
  );
}
