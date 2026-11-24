"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "@/icons";
import ComponentCard from "@/components/common/component-card";

export default function ButtonSpecimens() {
  const t = useTranslations("security.buttons");
  const [status, setStatus] = useState("ready");
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState(false);
  const act = () => setStatus("done");
  return (
    <section id="button-specimens" className="em-grid" aria-label={t("title")}>
      <ComponentCard columns={12} title={t("body")} desc={t("bodyHelp")}>
        <div className="em-button-specimens">
          <div className="em-button-specimen-row">
            <Button onClick={act}>{t("save")}</Button>
            <Button variant="neutral" onClick={act}>
              {t("neutral")}
            </Button>
            <Button variant="outline" onClick={act}>
              {t("outline")}
            </Button>
            <Button variant="ghost" onClick={act}>
              {t("ghost")}
            </Button>
            <Link
              href="/theme-settings"
              className={buttonVariants({ variant: "link" })}
            >
              {t("settings")}
              <ArrowRightIcon className="rtl:rotate-180" />
            </Link>
          </div>
          <div className="em-button-specimen-row">
            <Button variant="destructive" onClick={act}>
              {t("danger")}
            </Button>
            <Button variant="destructive-solid" onClick={act}>
              {t("dangerSolid")}
            </Button>
          </div>
        </div>
      </ComponentCard>
      <ComponentCard columns={12} title={t("brand")}>
        <div className="em-button-surface" data-surface="brand">
          <p>{t("brandHelp")}</p>
          <nav className="em-button-specimen-row" aria-label={t("brand")}>
            <Link
              href="/theme-settings"
              className={buttonVariants({ variant: "ghost", surface: "brand" })}
            >
              {t("settings")}
            </Link>
            <Link
              href="/vulnerabilities"
              className={buttonVariants({
                variant: "outline",
                surface: "brand",
              })}
            >
              {t("vulnerabilities")}
            </Link>
            <Button surface="brand" onClick={act}>
              {t("primary")}
            </Button>
          </nav>
          <div className="em-button-specimen-row">
            <Button surface="brand" variant="neutral" onClick={act}>
              {t("neutral")}
            </Button>
            <Link
              href="/theme-settings"
              className={buttonVariants({ variant: "link", surface: "brand" })}
            >
              {t("link")}
            </Link>
            <Button surface="brand" disabled>
              {t("disabled")}
            </Button>
          </div>
        </div>
      </ComponentCard>
      <ComponentCard columns={12} title={t("states")}>
        <div className="em-button-specimens">
          <div className="em-button-specimen-row">
            <Button variant="outline" size="sm" onClick={act}>
              {t("compact")}
            </Button>
            <Button variant="outline" onClick={act}>
              {t("standard")}
            </Button>
            <Button variant="outline" size="lg" onClick={act}>
              {t("touch")}
            </Button>
          </div>
          <div className="em-button-specimen-row">
            <Button
              variant="neutral"
              disabled={busy}
              aria-busy={busy}
              className="em-button-demo-loading"
              onClick={() => setBusy(true)}
            >
              {t(busy ? "loading" : "start")}
            </Button>
            <Button
              variant="outline"
              disabled={!busy}
              onClick={() => {
                setBusy(false);
                act();
              }}
            >
              {t("complete")}
            </Button>
            <Button disabled>{t("disabled")}</Button>
            <Button
              variant="ghost"
              aria-pressed={selected}
              onClick={() => setSelected(!selected)}
            >
              {t(selected ? "selected" : "toggle")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setBusy(false);
                setSelected(false);
                setStatus("resetDone");
              }}
            >
              {t("reset")}
            </Button>
          </div>
          <p className="em-button-demo-status" role="status">
            {t(status)}
          </p>
        </div>
      </ComponentCard>
    </section>
  );
}
