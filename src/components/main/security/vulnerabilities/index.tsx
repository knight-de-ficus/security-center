"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DownloadIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/icons";
import PageHeader from "../shared/page-header";
import SecuritySelect from "../shared/select";
import { initialVulnerabilities, severities, statuses, owners } from "../data";
import type { Vulnerability } from "../types";
import VulnerabilityTable from "./vulnerability-table";
import VulnerabilityDetail from "./vulnerability-detail";
interface VulnerabilitiesProps {
  initialSeverity?: string;
  initialTicket?: string;
  embedded?: boolean;
  pageSize?: number;
}
export default function Vulnerabilities({
  initialSeverity = "all",
  initialTicket,
  embedded = false,
  pageSize = 10,
}: VulnerabilitiesProps) {
  const t = useTranslations("security");
  const [items, setItems] = useState(initialVulnerabilities);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState(
    severities.includes(initialSeverity as (typeof severities)[number])
      ? initialSeverity
      : "all",
  );
  const [status, setStatus] = useState("all");
  const [owner, setOwner] = useState("all");
  const [sort, setSort] = useState("severity");
  const [page, setPage] = useState(0);
  // Selected row id drives both the highlighted row and the detail sheet.
  const [selectedId, setSelectedId] = useState<string | null>(
    () =>
      initialVulnerabilities.find((v) => v.id === initialTicket)?.id ?? null,
  );
  const [notice, setNotice] = useState("");
  const selected: Vulnerability | null =
    items.find((v) => v.id === selectedId) ?? null;
  const filtered = useMemo(
    () =>
      items
        .filter(
          (v) =>
            (severity === "all" || v.severity === severity) &&
            (status === "all" || v.status === status) &&
            (owner === "all" || v.owner === owner) &&
            `${v.id} ${t(`findings.${v.title}`)} ${v.asset} ${v.owner}`
              .toLowerCase()
              .includes(search.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "due"
            ? a.due.localeCompare(b.due)
            : sort === "newest"
              ? b.created.localeCompare(a.created)
              : severities.indexOf(a.severity) -
                  severities.indexOf(b.severity) || a.due.localeCompare(b.due),
        ),
    [items, severity, status, owner, search, sort, t],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const visible = filtered.slice(
    safePage * pageSize,
    (safePage + 1) * pageSize,
  );
  function changeFilter(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(0);
  }
  function reset() {
    setSearch("");
    setSeverity("all");
    setStatus("all");
    setOwner("all");
    setPage(0);
  }
  function save(updated: Vulnerability) {
    setItems((current) =>
      current.map((v) => (v.id === updated.id ? updated : v)),
    );
    setNotice(t("savedNotice", { id: updated.id }));
  }
  function exportCsv() {
    const rows = [
      [
        t("columns.id"),
        t("columns.vulnerability"),
        t("columns.severity"),
        t("columns.status"),
        t("columns.owner"),
        t("columns.due"),
      ],
      ...filtered.map((v) => [
        v.id,
        t(`findings.${v.title}`),
        t(`severity.${v.severity}`),
        t(`status.${v.status}`),
        v.owner,
        v.due,
      ]),
    ];
    const content =
      "\ufeff" +
      rows
        .map((row) => row.map((v) => `"${v.replaceAll('"', '""')}"`).join(","))
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "vulnerability-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotice(t("exportedNotice", { count: filtered.length }));
  }
  return (
    <>
      {embedded ? (
        <div className="em-control-row">
          <Button variant="security-outline" onClick={exportCsv}>
            <DownloadIcon className="size-4" />
            {t("exportList")}
          </Button>
        </div>
      ) : (
        <PageHeader
          page="vulnerabilities"
          action={
            <Button variant="security-outline" onClick={exportCsv}>
              <DownloadIcon className="size-4" />
              {t("exportList")}
            </Button>
          }
        />
      )}
      <div data-columns={12} className="sec-register">
        <div
          className="sec-register-tabs"
          role="group"
          aria-label={t("statusFilter")}
        >
          <button
            className={status === "all" ? "is-active" : ""}
            aria-pressed={status === "all"}
            onClick={() => changeFilter(setStatus, "all")}
          >
            {t("allFindings")}
            <span>{items.length}</span>
          </button>
          {statuses.map((s) => (
            <button
              key={s}
              className={status === s ? "is-active" : ""}
              aria-pressed={status === s}
              onClick={() => changeFilter(setStatus, s)}
            >
              {t(`status.${s}`)}
              <span>{items.filter((v) => v.status === s).length}</span>
            </button>
          ))}
        </div>
        <div className="sec-filter-bar">
          <div className="sec-search">
            <SearchIcon className="size-4" />
            <Input
              variant="security"
              aria-label={t("searchPlaceholder")}
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => changeFilter(setSearch, e.target.value)}
            />
          </div>
          <SecuritySelect
            value={severity}
            onChange={(v) => changeFilter(setSeverity, v)}
            label={t("severityFilter")}
            options={[
              { value: "all", label: t("allSeverities") },
              ...severities.map((s) => ({
                value: s,
                label: t(`severity.${s}`),
              })),
            ]}
          />
          <SecuritySelect
            value={owner}
            onChange={(v) => changeFilter(setOwner, v)}
            label={t("ownerFilter")}
            options={[
              { value: "all", label: t("allOwners") },
              ...owners.map((v) => ({ value: v, label: v })),
            ]}
          />
          <SecuritySelect
            value={sort}
            onChange={setSort}
            label={t("sortLabel")}
            options={[
              { value: "severity", label: t("sortSeverity") },
              { value: "due", label: t("sortDue") },
              { value: "newest", label: t("sortNewest") },
            ]}
          />
        </div>
        {(search ||
          severity !== "all" ||
          status !== "all" ||
          owner !== "all") && (
          <div className="sec-active-filters">
            <span>{t("matchedResults", { count: filtered.length })}</span>
            <Button variant="security-ghost" size="sm" onClick={reset}>
              {t("clearFilters")}
            </Button>
          </div>
        )}
        <VulnerabilityTable
          items={visible}
          selectedId={selectedId}
          onSelect={(v) => setSelectedId(v.id)}
        />
        {!visible.length && (
          <div className="sec-empty">
            <SearchIcon className="size-6" />
            <h2>{t("noResults")}</h2>
            <p>{t("noResultsDescription")}</p>
            <Button variant="security-outline" onClick={reset}>
              {t("clearFilters")}
            </Button>
          </div>
        )}
        <div className="sec-pagination">
          <p>
            {t("pagination", {
              from: filtered.length ? safePage * pageSize + 1 : 0,
              to: Math.min((safePage + 1) * pageSize, filtered.length),
              total: filtered.length,
            })}
          </p>
          <div>
            <Button
              variant="security-outline"
              size="icon-sm"
              aria-label={t("previousPage")}
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
            >
              <ChevronLeftIcon className="size-4 rtl:rotate-180" />
            </Button>
            <span>
              {safePage + 1} / {totalPages}
            </span>
            <Button
              variant="security-outline"
              size="icon-sm"
              aria-label={t("nextPage")}
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage(safePage + 1)}
            >
              <ChevronRightIcon className="size-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
      <p className="sec-register-caption">{t("snapshotDate")}</p>
      <div className="sec-notice" role="status">
        {notice}
      </div>
      <VulnerabilityDetail
        key={selected?.id ?? "closed"}
        item={selected}
        onClose={() => setSelectedId(null)}
        onSave={save}
      />
    </>
  );
}
