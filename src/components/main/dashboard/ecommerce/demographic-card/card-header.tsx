"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { HorizontalDotsIcon } from "@/icons";
import { useTranslations } from "next-intl";

export default function CardHeader() {
  const t = useTranslations("ecommerce.demographic");
  const tCommon = useTranslations("common");

  return (
    <div className="flex justify-between">
      <div>
        <h3 className="em-card-title">{t("title")}</h3>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              aria-label={tCommon("viewMore")}
              variant="ghost"
              size="icon-xs"
            />
          }
        >
          <HorizontalDotsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>{tCommon("viewMore")}</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            {tCommon("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
