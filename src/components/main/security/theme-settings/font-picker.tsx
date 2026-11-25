"use client";
import { saveEditorialTheme } from "@/utils/editorial-theme";

import withBasePath from "@/utils/with-base-path";
import { useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import SecuritySelect from "../shared/select";
import {
  isWorkspaceFont,
  readWorkspaceFont,
  serverWorkspaceFont,
  setWorkspaceFont,
  subscribeWorkspaceFont,
  workspaceFontFaces,
  workspaceFonts,
} from "@/utils/workspace-font";

export default function FontPicker() {
  const t = useTranslations("security.fontSettings");
  const current = useSyncExternalStore(
    subscribeWorkspaceFont,
    readWorkspaceFont,
    serverWorkspaceFont,
  );
  const request = useRef(0);
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error" | "notSaved"
  >("idle");
  async function choose(value: string) {
    if (!isWorkspaceFont(value)) return;
    const revision = ++request.current;
    const fontSaved = setWorkspaceFont(value);
    const saved = saveEditorialTheme() && fontSaved;
    const face = workspaceFontFaces[value];
    setStatus("loading");
    try {
      if (face) {
        const loaded = await document.fonts.load(
          `400 14px "${face}"`,
          "漏洞Aa0123",
        );
        if (loaded.length === 0) throw new Error("Font did not load");
      }
      await document.fonts.ready;
      if (revision === request.current) setStatus(saved ? "ready" : "notSaved");
    } catch {
      if (revision === request.current) setStatus("error");
    }
  }
  return (
    <ComponentCard
      variant="security"
      columns={12}
      className="em-font-settings"
      title={t("title")}
      action={
        <SecuritySelect
          value={current}
          onChange={choose}
          label={t("label")}
          options={workspaceFonts.map((value) => ({ value, label: t(value) }))}
        />
      }
    >
      <p className="em-font-preview-title">{t("sampleTitle")}</p>
      <p className="em-font-preview-body">{t("sampleBody")}</p>
      <p className="em-font-preview-numbers">Aa Bb 0123456789 · 84.6%</p>
      <p className="em-font-status" role="status">
        {t(status)}
      </p>
      <p className="em-font-licenses">
        {t("credits")}{" "}
        <a
          href={withBasePath("/fonts/misans/LICENSE.pdf")}
          target="_blank"
          rel="noreferrer"
        >
          MiSans
        </a>
        {" · "}
        <a
          href={withBasePath("/fonts/oppo-sans-4/LICENSE.txt")}
          target="_blank"
          rel="noreferrer"
        >
          OPPO Sans 4.0
        </a>
        {" · "}
        <a
          href={withBasePath("/fonts/harmonyos-sans/LICENSE.txt")}
          target="_blank"
          rel="noreferrer"
        >
          HarmonyOS Sans
        </a>
      </p>
    </ComponentCard>
  );
}
