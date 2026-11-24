"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SecuritySelect from "../shared/select";
import { owners, severities, statuses } from "../data";
import type { Vulnerability } from "../types";
interface EditProps {
  item: Vulnerability;
  onSave: (v: Vulnerability) => void;
  onCancel: () => void;
}
export default function EditForm({ item, onSave, onCancel }: EditProps) {
  const t = useTranslations("security");
  const schema = z.object({
    owner: z.string().min(1, t("required")),
    severity: z.enum(["critical", "high", "medium", "low"]),
    status: z.enum(["open", "inProgress", "resolved", "closed"]),
    due: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, t("invalidDate"))
      .refine(
        (v) => !Number.isNaN(Date.parse(v)) && v >= item.created,
        t("invalidDate"),
      ),
    notes: z.string().max(2000, t("notesLimit")),
  });
  type Values = z.infer<typeof schema>;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      owner: item.owner,
      severity: item.severity,
      status: item.status,
      due: item.due,
      notes: item.notes,
    },
  });
  return (
    <form
      className="sec-edit-form"
      onSubmit={handleSubmit((values) => onSave({ ...item, ...values }))}
    >
      <Field>
        <FieldLabel>{t("columns.owner")}</FieldLabel>
        <Controller
          name="owner"
          control={control}
          render={({ field }) => (
            <SecuritySelect
              label={t("columns.owner")}
              value={field.value}
              onChange={field.onChange}
              options={owners.map((v) => ({ value: v, label: v }))}
            />
          )}
        />
      </Field>
      <div className="sec-form-grid">
        <Field columns={6}>
          <FieldLabel>{t("columns.severity")}</FieldLabel>
          <Controller
            name="severity"
            control={control}
            render={({ field }) => (
              <SecuritySelect
                label={t("columns.severity")}
                value={field.value}
                onChange={field.onChange}
                options={severities.map((v) => ({
                  value: v,
                  label: t(`severity.${v}`),
                }))}
              />
            )}
          />
        </Field>
        <Field columns={6}>
          <FieldLabel>{t("columns.status")}</FieldLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SecuritySelect
                label={t("columns.status")}
                value={field.value}
                onChange={field.onChange}
                options={statuses.map((v) => ({
                  value: v,
                  label: t(`status.${v}`),
                }))}
              />
            )}
          />
        </Field>
      </div>
      <Field data-invalid={!!errors.due}>
        <FieldLabel>{t("columns.due")}</FieldLabel>
        <Input
          variant="security"
          type="date"
          aria-invalid={!!errors.due}
          {...register("due")}
        />
        <FieldError>{errors.due?.message}</FieldError>
      </Field>
      <Field data-invalid={!!errors.notes}>
        <FieldLabel>{t("notes")}</FieldLabel>
        <Textarea
          aria-invalid={!!errors.notes}
          className="sec-input sec-textarea"
          rows={5}
          {...register("notes")}
          placeholder={t("notesPlaceholder")}
        />
        <FieldError>{errors.notes?.message}</FieldError>
      </Field>
      {isDirty && (
        <p role="status" className="sec-panel-footnote">
          {t("unsavedChanges")}
        </p>
      )}
      <div className="sec-detail-footer">
        <Button variant="security-outline" type="button" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button variant="security" type="submit">
          {t("saveChanges")}
        </Button>
      </div>
    </form>
  );
}
