"use client";

import { BoxIcon, UsersIcon } from "@/icons";
import { useTranslations } from "next-intl";
import MetricCard from "./metric-card";

export default function EcommerceMetrics() {
  const t = useTranslations("ecommerce.metrics");

  return (
    <div className="em-grid em-nested-grid">
      <MetricCard
        icon={<UsersIcon />}
        title={t("customers")}
        value="3,782"
        change="11.01%"
        comparison={t("comparison")}
        direction="up"
      />
      <MetricCard
        icon={<BoxIcon />}
        title={t("orders")}
        value="5,359"
        change="9.05%"
        comparison={t("comparison")}
        direction="down"
      />
    </div>
  );
}
