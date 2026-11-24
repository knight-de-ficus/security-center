"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useLocale } from "next-intl";
import { AnalyticsOrder } from "./types";

export interface OrderRowProps {
  order: AnalyticsOrder;
}

const categoryMap: Record<string, string> = {
  uiKits: "UI Kits",
  templates: "Templates",
  saas: "SaaS",
};

export default function OrderRow({ order }: OrderRowProps) {
  const category = categoryMap[order.category] ?? order.category;
  const locale = useLocale();
  const countryCodes: Record<string, string> = {
    usa: "US",
    yemen: "YE",
    sudan: "SD",
    bangladesh: "BD",
    switzerland: "CH",
    norway: "NO",
    france: "FR",
  };
  const country =
    countryCodes[order.country.split("/").at(-1)?.split(".")[0] ?? ""];

  return (
    <TableRow>
      <TableCell className="py-3 ps-4 text-start text-sm font-medium text-foreground sm:ps-6 dark:text-foreground">
        {order.name}
      </TableCell>
      <TableCell className="py-3 text-start text-sm text-muted-foreground dark:text-gray-400">
        {category}
      </TableCell>
      <TableCell className="py-3 text-start text-sm text-muted-foreground dark:text-gray-400">
        <div className="h-5 w-5">
          <Image
            src={order.country}
            className="h-5 w-5 rounded-sm object-fill"
            alt={
              country
                ? new Intl.DisplayNames(locale, { type: "region" }).of(country) ?? ""
                : ""
            }
            width={20}
            height={20}
          />
        </div>
      </TableCell>
      <TableCell className="em-numeric py-3 text-start text-sm text-muted-foreground dark:text-gray-400">
        {order.cr}
      </TableCell>
      <TableCell className="em-numeric py-3 pe-4 text-sm text-foreground sm:pe-6 dark:text-foreground">
        {Number(order.value.replaceAll(",", "")).toLocaleString(locale, {
          style: "currency",
          currency: "USD",
        })}
      </TableCell>
    </TableRow>
  );
}
