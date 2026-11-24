"use client";

import { useSearchParams } from "next/navigation";
import Vulnerabilities from "./index";

export default function VulnerabilityQueryView() {
  const query = useSearchParams();
  const severity = query.get("severity") ?? undefined;
  const ticket = query.get("ticket") ?? undefined;

  return (
    <Vulnerabilities
      key={JSON.stringify([severity, ticket])}
      initialSeverity={severity}
      initialTicket={ticket}
    />
  );
}
