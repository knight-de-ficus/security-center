"use client";

import { useState } from "react";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LabeledRadioButtons() {
  const [value, setValue] = useState<string>("selected");

  return (
    <RadioGroup
      value={value}
      onValueChange={(val) => setValue(val as string)}
      className="flex flex-wrap items-center gap-6 sm:gap-8"
    >
      <Field orientation="horizontal" className="w-auto gap-2.5">
        <RadioGroupItem id="radio-default" value="default" />
        <Label
          htmlFor="radio-default"
          className="cursor-pointer text-sm font-medium text-foreground dark:text-foreground"
        >
          Default
        </Label>
      </Field>

      <Field orientation="horizontal" className="w-auto gap-2.5">
        <RadioGroupItem id="radio-selected" value="selected" />
        <Label
          htmlFor="radio-selected"
          className="cursor-pointer text-sm font-medium text-foreground dark:text-foreground"
        >
          Selected
        </Label>
      </Field>

      <Field orientation="horizontal" className="w-auto gap-2.5">
        <RadioGroupItem id="radio-disabled" value="disabled" disabled />
        <Label
          htmlFor="radio-disabled"
          className="cursor-not-allowed text-sm font-medium text-gray-400 dark:text-muted-foreground"
        >
          Disabled
        </Label>
      </Field>
    </RadioGroup>
  );
}
