"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDownIcon } from "@/icons";

export default function PhoneInputEnd() {
  return (
    <Field>
      <FieldLabel>Phone</FieldLabel>
      <InputGroup className="overflow-hidden">
        <InputGroupInput type="tel" placeholder="+1 (555) 000-0000" />
        <InputGroupAddon
          align="inline-end"
          className="relative self-stretch border-s border-gray-200 p-0 dark:border-border"
        >
          <div className="relative flex h-full items-center">
            <select
              defaultValue="US"
              onClick={(e) => e.stopPropagation()}
              className="em-native-select"
            >
              <option value="US" className="em-native-option">
                US
              </option>
              <option value="GB" className="em-native-option">
                GB
              </option>
              <option value="CA" className="em-native-option">
                CA
              </option>
              <option value="AU" className="em-native-option">
                AU
              </option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute inset-e-2.5 size-4 text-muted-foreground dark:text-gray-400" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
