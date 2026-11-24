"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import { Button } from "@/components/ui/button";
import { initialVulnerabilities } from "@/components/main/security/data";
import VulnerabilityDetail from "@/components/main/security/vulnerabilities/vulnerability-detail";

export default function FindingDetailExample() {
  const t = useTranslations("businessExamples");
  const security = useTranslations("security");
  const [item, setItem] = useState(initialVulnerabilities[0]);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <ComponentCard title={t("detail")}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {t("openDetail")}
      </Button>
      <p className="em-description" role="status">
        {notice}
      </p>
      <VulnerabilityDetail
        key={open ? item.id : "closed"}
        item={open ? item : null}
        onClose={() => setOpen(false)}
        onSave={(updated) => {
          setItem(updated);
          setNotice(security("savedNotice", { id: updated.id }));
        }}
      />
    </ComponentCard>
  );
}
