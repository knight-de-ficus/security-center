"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface SecuritySelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: string }[];
}
export default function SecuritySelect({
  value,
  onChange,
  label,
  options,
}: SecuritySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => v !== null && onChange(String(v))}
    >
      <SelectTrigger aria-label={label} className="sec-select">
        <SelectValue>
          {options.find((v) => v.value === value)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="sec-select-popup">
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
