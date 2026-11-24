"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ComponentCard from "@/components/common/component-card";
import EditForm from "@/components/main/security/vulnerabilities/edit-form";
import { initialVulnerabilities } from "@/components/main/security/data";

export default function SecurityEditExample() {
  const t = useTranslations("businessExamples");
  const security = useTranslations("security");
  const [item, setItem] = useState(initialVulnerabilities[0]);
  const [revision, setRevision] = useState(0);
  const [notice, setNotice] = useState("");
  return (
    <ComponentCard title={t("editForm")}>
      <EditForm
        key={revision}
        item={item}
        onSave={(updated) => {
          setItem(updated);
          setRevision((value) => value + 1);
          setNotice(security("savedNotice", { id: updated.id }));
        }}
        onCancel={() => {
          setRevision((value) => value + 1);
          setNotice(t("cancelled"));
        }}
      />
      <p className="em-description" role="status">
        {notice}
      </p>
    </ComponentCard>
  );
}
