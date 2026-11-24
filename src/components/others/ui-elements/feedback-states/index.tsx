"use client";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
export default function FeedbackStates() {
  const t = useTranslations("security.workbench.gallery");
  return (
    <section className="em-grid em-example-grid">
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("loading")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <Skeleton className="h-6 w-32" />
          <Separator />
          <p>{t("ready")}</p>
        </CardContent>
      </Card>
      <Card columns={4}>
        <CardHeader>
          <CardTitle>{t("progress")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <span>48 / 100</span>
          <Progress value={48} aria-label={t("progress")} />
          <span>0 / 100</span>
          <Progress value={0} aria-label={t("zero")} />
        </CardContent>
      </Card>
    </section>
  );
}
