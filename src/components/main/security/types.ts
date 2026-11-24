export type Severity = "critical" | "high" | "medium" | "low";
export type VulnerabilityStatus = "open" | "inProgress" | "resolved" | "closed";
export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  status: VulnerabilityStatus;
  asset: string;
  ip: string;
  team: string;
  owner: string;
  score: number;
  created: string;
  due: string;
  notes: string;
}
