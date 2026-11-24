"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
export default function ActionCombinations() {
  const t = useTranslations("security.workbench.gallery");
  const [action, setAction] = useState("");
  return (
    <section className="em-grid em-example-grid">
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("combinations")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <ButtonGroup aria-label={t("combinations")}>
            <Button variant="outline" onClick={() => setAction(t("one"))}>
              {t("one")}
            </Button>
            <Button variant="outline" onClick={() => setAction(t("two"))}>
              {t("two")}
            </Button>
            <Button variant="outline" onClick={() => setAction(t("three"))}>
              {t("three")}
            </Button>
          </ButtonGroup>
          <ToggleGroup
            defaultValue={["one"]}
            variant="outline"
            spacing={0}
            aria-label={t("selection")}
          >
            <ToggleGroupItem value="one">{t("one")}</ToggleGroupItem>
            <ToggleGroupItem value="two">{t("two")}</ToggleGroupItem>
            <ToggleGroupItem value="three">{t("three")}</ToggleGroupItem>
          </ToggleGroup>
          <div className="em-control-row">
            <Toggle variant="outline">{t("checked")}</Toggle>
            <Toggle disabled>{t("disabled")}</Toggle>
          </div>
          <p role="status" className="em-description">
            {action || t("ready")}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
