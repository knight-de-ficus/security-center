import { cn } from "@/utils";
import { AddressItemProps } from "./types";

export default function AddressItem({
  label,
  value,
  className,
}: AddressItemProps) {
  return (
    <div data-columns={6} className={cn(className)}>
      <p className="mb-2 text-xs leading-normal text-muted-foreground dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground dark:text-foreground">
        {value}
      </p>
    </div>
  );
}
