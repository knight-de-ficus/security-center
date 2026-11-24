"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ComponentCard from "@/components/common/component-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SecurityBadge from "../shared/badge";
import type { Vulnerability } from "../types";
export default function PriorityList({ items }: { items: Vulnerability[] }) {
  const t = useTranslations("security");
  return (
    <ComponentCard
      variant="security"
      title={t("priorityQueue")}
      className="sec-priority-panel"
      action={
        <Link href="/vulnerabilities" className="sec-text-link">
          {t("viewAll")}
        </Link>
      }
    >
      <div className="sec-table-scroll">
        <Table className="sec-table">
          <TableHeader>
            <TableRow>
              {[
                "vulnerability",
                "severity",
                "asset",
                "owner",
                "due",
                "status",
              ].map((c) => (
                <TableCell key={c} isHeader>
                  {t(`columns.${c}`)}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!items.length && (
              <TableRow>
                <TableCell colSpan={6}>{t("noPriorityItems")}</TableCell>
              </TableRow>
            )}
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>
                  <Link
                    className="sec-vuln-link"
                    href={`/vulnerabilities?ticket=${v.id}`}
                  >
                    {t(`findings.${v.title}`)}
                  </Link>
                  <small className="sec-record-id">{v.id}</small>
                </TableCell>
                <TableCell>
                  <SecurityBadge severity={v.severity} />
                </TableCell>
                <TableCell>
                  <span className="sec-code">{v.asset}</span>
                </TableCell>
                <TableCell>{v.owner}</TableCell>
                <TableCell className="num-col">
                  <span className="sec-tabular">{v.due}</span>
                </TableCell>
                <TableCell>
                  <SecurityBadge status={v.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentCard>
  );
}
