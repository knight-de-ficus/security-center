import type { Severity, Vulnerability, VulnerabilityStatus } from "./types";

export const snapshotDate = "2026-11-22";
export const severities: Severity[] = ["critical", "high", "medium", "low"];
export const statuses: VulnerabilityStatus[] = [
  "open",
  "inProgress",
  "resolved",
  "closed",
];
const titles = [
  "accessControl",
  "sqlInjection",
  "exposedConfig",
  "outdatedLibrary",
  "weakPassword",
  "missingHeaders",
  "fileUpload",
  "sensitiveData",
];
export const teams = ["commerce", "platform", "data", "infrastructure"];
export const owners = ["Lin Chen", "Alex Morgan", "Sarah Kim", "Daniel Wu"];
const assetNames = [
  "payment-api",
  "identity-service",
  "data-gateway",
  "edge-proxy",
  "order-service",
  "internal-portal",
];
const workflow: VulnerabilityStatus[] = [
  "open",
  "inProgress",
  "open",
  "resolved",
  "closed",
  "inProgress",
];
function dateOffset(offset: number) {
  const date = new Date(`${snapshotDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}
export const initialVulnerabilities: Vulnerability[] = Array.from(
  { length: 72 },
  (_, i) => ({
    id: `VUL-${2048 - i}`,
    title: titles[i % titles.length],
    severity: i < 8 ? "critical" : i < 26 ? "high" : i < 56 ? "medium" : "low",
    status: workflow[i % workflow.length],
    asset: assetNames[i % assetNames.length],
    ip: `192.0.2.${10 + i}`,
    team: teams[i % teams.length],
    owner: owners[i % owners.length],
    score: i < 8 ? 9.8 : i < 26 ? 8.1 : i < 56 ? 5.6 : 3.1,
    created: dateOffset(-30 + (i % 18)),
    due: dateOffset(-6 + (i % 19)),
    notes: "",
  }),
);
export function isActive(item: Vulnerability) {
  return item.status === "open" || item.status === "inProgress";
}
export function isOverdue(item: Vulnerability) {
  return isActive(item) && item.due < snapshotDate;
}
export function getMetrics(items: Vulnerability[]) {
  const active = items.filter(isActive);
  const resolved = items.length - active.length;
  return {
    total: items.length,
    active: active.length,
    critical: active.filter((v) => v.severity === "critical").length,
    overdue: items.filter(isOverdue).length,
    resolved,
    rate: items.length ? (resolved / items.length) * 100 : 0,
  };
}
export const trendDays = Array.from({ length: 30 }, (_, i) =>
  dateOffset(i - 29),
);
export const newFindings = [
  8, 6, 9, 7, 11, 8, 5, 6, 10, 7, 8, 9, 12, 8, 6, 7, 5, 9, 7, 6, 8, 5, 6, 4, 7,
  5, 6, 4, 5, 3,
];
export const remediated = [
  5, 7, 6, 8, 7, 9, 6, 8, 7, 10, 8, 9, 8, 10, 9, 8, 11, 10, 9, 12, 10, 9, 11, 8,
  10, 12, 9, 11, 10, 12,
];
export const weeklyMttr = [5.2, 4.8, 4.1, 3.6];
export const heatmap = teams.map((team, r) => ({
  team,
  values: Array.from({ length: 28 }, (_, i) => (i * 7 + r * 3 + (i % 5)) % 6),
}));
// Category identity is stable even when a view changes its sort order.
export const findingTypeDistribution = [
  { id: "application", percentage: 36 },
  { id: "configuration", percentage: 27 },
  { id: "component", percentage: 21 },
  { id: "identity", percentage: 16 },
] as const;
