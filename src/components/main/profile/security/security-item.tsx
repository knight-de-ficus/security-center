import { cn } from "@/utils";
import type { SecurityItemProps } from "./types";

export default function SecurityItem({
  title,
  description,
  action,
  hasDivider = false,
  className,
}: SecurityItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 py-4 first:pt-0 sm:flex-row sm:items-center",
        hasDivider && "border-b border-gray-200 pb-4 dark:border-border",
        className,
      )}
    >
      <div>
        <h4 className="mb-1 text-base font-medium text-foreground dark:text-foreground">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="flex shrink-0 items-center">{action}</div>
    </div>
  );
}
