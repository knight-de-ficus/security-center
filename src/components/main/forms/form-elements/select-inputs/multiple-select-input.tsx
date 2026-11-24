"use client";

import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "@/icons";

const colorOptions = [
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Red", label: "Red" },
  { value: "Yellow", label: "Yellow" },
  { value: "Purple", label: "Purple" },
  { value: "Orange", label: "Orange" },
];

export default function MultipleSelectInput() {
  const [selectedValues, setSelectedValues] = useState<string[]>([
    "Blue",
    "Green",
  ]);

  const handleRemove = (valueToRemove: string) => {
    setSelectedValues((prev) => prev.filter((val) => val !== valueToRemove));
  };

  return (
    <Field>
      <FieldLabel>Multiple Select Options</FieldLabel>
      <Select
        multiple
        value={selectedValues}
        onValueChange={(val) => setSelectedValues(val as string[])}
      >
        <SelectTrigger
          render={<div />}
          nativeButton={false}
          className="em-multi-select"
        >
          <SelectValue placeholder="Select Option">
            {(values: string[]) => {
              if (!values || values.length === 0) return null;
              return (
                <div className="flex flex-wrap items-center gap-2">
                  {values.map((val) => (
                    <span key={val} className="em-combobox-chip">
                      <span>{val}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${val}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(val);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                          }
                        }}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                        }}
                        className="em-chip-remove"
                      >
                        <XIcon className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              );
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {colorOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
