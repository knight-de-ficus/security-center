import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function UrlInput() {
  return (
    <Field>
      <FieldLabel>URL</FieldLabel>
      <InputGroup className="overflow-hidden">
        <InputGroupAddon
          align="inline-start"
          className="self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-border"
        >
          <span className="text-sm font-normal text-muted-foreground dark:text-gray-400">
            http://
          </span>
        </InputGroupAddon>
        <InputGroupInput type="text" placeholder="www.tailadmin.com" />
      </InputGroup>
    </Field>
  );
}
