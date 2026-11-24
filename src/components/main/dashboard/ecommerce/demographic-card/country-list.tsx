"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { demographicData } from "./data";

export default function CountryList() {
  const t = useTranslations("ecommerce.demographic");

  return (
    <div className="flex flex-col gap-5">
      {demographicData.map((country) => (
        <div key={country.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative size-8 shrink-0 overflow-hidden rounded-lg">
              <Image
                width={32}
                height={32}
                src={country.flag}
                alt={t(country.nameKey)}
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground dark:text-foreground">
                {t(country.nameKey)}
              </p>
              <span className="block text-xs font-normal text-muted-foreground dark:text-gray-400">
                {t("customers", { count: country.customerCount })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <p className="text-sm font-medium text-foreground dark:text-foreground">
              {country.percentage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
