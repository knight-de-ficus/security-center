"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HorizontalSlideIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { recentOrdersData } from "./data";
import OrderRow from "./order-row";

export default function RecentOrders() {
  const t = useTranslations("ecommerce.recentOrders");
  const tCommon = useTranslations("common");

  return (
    <div className="em-module">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="em-card-title">{t("title")}</h3>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <HorizontalSlideIcon />
            {tCommon("filter")}
          </Button>
          <Button variant="outline">{tCommon("seeAll")}</Button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-y border-gray-100 dark:border-border">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 text-start text-xs font-medium text-muted-foreground dark:text-gray-400"
              >
                {t("products")}
              </TableCell>
              <TableCell
                isHeader
                className="py-3 text-start text-xs font-medium text-muted-foreground dark:text-gray-400"
              >
                {t("category")}
              </TableCell>
              <TableCell
                isHeader
                className="em-numeric py-3 text-xs font-medium text-muted-foreground dark:text-gray-400"
              >
                {t("price")}
              </TableCell>
              <TableCell
                isHeader
                className="py-3 text-start text-xs font-medium text-muted-foreground dark:text-gray-400"
              >
                {t("status")}
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentOrdersData.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
