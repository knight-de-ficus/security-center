"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AmazonIcon,
  AppleIcon,
  EnvatoIcon,
  HorizontalDotsIcon,
  NetflixIcon,
  PaypalIcon,
  SpotifyIcon,
  TeslaIcon,
} from "@/icons";
import { cn } from "@/utils";
import { ReactNode } from "react";
import { Transaction, TransactionBrand } from "./types";

interface TransactionRowProps {
  transaction: Transaction;
}

const brandConfig: Record<
  TransactionBrand,
  {
    icon: ReactNode;
    bgClass: string;
  }
> = {
  paypal: {
    icon: <PaypalIcon className="size-4" />,
    bgClass: "em-transaction-icon",
  },
  apple: {
    icon: <AppleIcon className="size-4" />,
    bgClass: "em-transaction-icon",
  },
  netflix: {
    icon: <NetflixIcon className="size-4" />,
    bgClass: "em-transaction-icon",
  },
  tesla: {
    icon: <TeslaIcon className="size-4" />,
    bgClass: "em-transaction-icon",
  },
  amazon: {
    icon: <AmazonIcon className="size-4.5" />,
    bgClass: "em-transaction-icon",
  },
  spotify: {
    icon: <SpotifyIcon className="size-4" />,
    bgClass: "em-transaction-icon",
  },
  envato: {
    icon: <EnvatoIcon className="size-3.5" />,
    bgClass: "em-transaction-icon",
  },
};

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const brand = brandConfig[transaction.brand];

  return (
    <TableRow className="h-16 border-b border-gray-100 dark:border-border">
      <TableCell className="min-w-44 py-3 ps-5 text-start sm:ps-6">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full",
              brand?.bgClass,
            )}
          >
            {brand?.icon}
          </div>
          <span className="text-sm font-medium whitespace-nowrap text-foreground dark:text-foreground">
            {transaction.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="min-w-44 px-4 py-3 text-start text-sm whitespace-nowrap text-foreground dark:text-gray-400">
        {transaction.date}
      </TableCell>
      <TableCell className="em-numeric min-w-32 px-4 py-3 text-start text-sm whitespace-nowrap text-foreground dark:text-gray-400">
        {transaction.price}
      </TableCell>
      <TableCell className="min-w-36 px-4 py-3 text-start text-sm whitespace-nowrap text-foreground dark:text-gray-400">
        {transaction.category}
      </TableCell>
      <TableCell className="min-w-28 px-4 py-3 text-start text-sm whitespace-nowrap">
        <Badge
          size="sm"
          color={
            transaction.status.toLowerCase() === "success"
              ? "success"
              : transaction.status.toLowerCase() === "pending"
                ? "warning"
                : "error"
          }
        >
          {transaction.status}
        </Badge>
      </TableCell>
      <TableCell className="min-w-16 py-3 pe-5 text-end whitespace-nowrap sm:pe-6">
        <Button size="icon-sm" variant="ghost" aria-label="More options">
          <HorizontalDotsIcon className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
