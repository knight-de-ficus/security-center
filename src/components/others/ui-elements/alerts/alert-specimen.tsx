"use client";
import { useTranslations } from "next-intl";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Link } from "@/i18n/navigation";
import type { ReactNode, ComponentProps } from "react";
interface AlertSpecimenProps {
  kind: "default" | "success" | "warning" | "error" | "info";
  variant: ComponentProps<typeof Alert>["variant"];
  icon: ReactNode;
}
export default function AlertSpecimen({
  kind,
  variant,
  icon,
}: AlertSpecimenProps) {
  const t = useTranslations("security.workbench.alerts");
  return (
    <div className="em-gallery-stack">
      {[true, false].map((withAction) => (
        <Alert key={String(withAction)} variant={variant}>
          {icon}
          <AlertTitle>{t(`${kind}.title`)}</AlertTitle>
          <AlertDescription>
            <p>{t(`${kind}.description`)}</p>
            {withAction && (
              <Link href="/basic-tables" className="em-alert-link">
                {t("action")}
              </Link>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
