"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
interface ChartDataTableProps {
  categories: readonly string[];
  series: readonly { name: string; data: readonly (number | null)[] }[];
}
export default function ChartDataTable({
  categories,
  series,
}: ChartDataTableProps) {
  const t = useTranslations("security.workbench.chartData");
  const locale = useLocale();
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  return (
    <details className="em-chart-data">
      <summary>{t("view")}</summary>
      <div className="em-chart-data-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>{t("period")}</TableCell>
              {series.map((s) => (
                <TableCell key={s.name} isHeader className="em-numeric">
                  {s.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, i) => (
              <TableRow key={`${category}-${i}`}>
                <TableCell>{category}</TableCell>
                {series.map((s) => (
                  <TableCell className="em-numeric" key={s.name}>
                    {typeof s.data[i] === "number"
                      ? format.format(s.data[i] as number)
                      : t("missing")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </details>
  );
}
