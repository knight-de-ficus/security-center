import { setRequestLocale } from "next-intl/server";
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
    </div>
  );
}
