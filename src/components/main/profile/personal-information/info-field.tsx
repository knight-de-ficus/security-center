import { cn } from "@/utils";
import { InfoFieldProps } from "./types";

export default function InfoField({ label, value, className }: InfoFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:gap-2", className)}>
      <p className="em-profile-info-label">{label}</p>
      <p className="em-profile-info-value">{value || "—"}</p>
    </div>
  );
}
