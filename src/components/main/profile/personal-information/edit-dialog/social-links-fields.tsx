"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SocialLinksFieldsProps } from "./types";

export default function SocialLinksFields({
  register,
  errors,
}: SocialLinksFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-foreground dark:text-foreground">
        Social Links
      </h3>

      <div className="em-grid em-nested-grid">
        <Field columns={6} data-invalid={Boolean(errors.facebook)}>
          <FieldLabel className="mb-1.5 block">Facebook</FieldLabel>
          <Input
            {...register("facebook")}
            type="url"
            placeholder="https://facebook.com/username"
            aria-invalid={errors.facebook ? "true" : undefined}
          />
          <FieldError errors={[errors.facebook]} />
        </Field>

        <Field columns={6} data-invalid={Boolean(errors.x)}>
          <FieldLabel className="mb-1.5 block">X.com</FieldLabel>
          <Input
            {...register("x")}
            type="url"
            placeholder="https://x.com/username"
            aria-invalid={errors.x ? "true" : undefined}
          />
          <FieldError errors={[errors.x]} />
        </Field>

        <Field columns={6} data-invalid={Boolean(errors.linkedin)}>
          <FieldLabel className="mb-1.5 block">Linkedin</FieldLabel>
          <Input
            {...register("linkedin")}
            type="url"
            placeholder="https://linkedin.com/in/username"
            aria-invalid={errors.linkedin ? "true" : undefined}
          />
          <FieldError errors={[errors.linkedin]} />
        </Field>

        <Field columns={6} data-invalid={Boolean(errors.instagram)}>
          <FieldLabel className="mb-1.5 block">Instagram</FieldLabel>
          <Input
            {...register("instagram")}
            type="url"
            placeholder="https://instagram.com/username"
            aria-invalid={errors.instagram ? "true" : undefined}
          />
          <FieldError errors={[errors.instagram]} />
        </Field>
      </div>
    </div>
  );
}
