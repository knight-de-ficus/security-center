"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addressSchema, type AddressFormData } from "./schema";
import { EditAddressModalProps } from "./types";

export default function EditAddressModal({
  isOpen,
  onOpenChange,
  initialData,
  onSave,
}: EditAddressModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
    mode: "onTouched",
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: AddressFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent size="wide">
        <DialogHeader className="gap-2 pe-14 text-start">
          <DialogTitle className="text-2xl font-semibold text-foreground dark:text-foreground">
            Edit Address
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground dark:text-gray-400">
            All four address fields are required.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="em-grid em-nested-grid">
            <Field
              columns={6}
              data-invalid={Boolean(errors.country)}
              className="gap-1.5"
            >
              <FieldLabel>Country</FieldLabel>
              <Input
                {...register("country")}
                placeholder="Country"
                aria-invalid={errors.country ? "true" : undefined}
              />
              <FieldError errors={[errors.country]} />
            </Field>

            <Field
              columns={6}
              data-invalid={Boolean(errors.cityState)}
              className="gap-1.5"
            >
              <FieldLabel>City/State</FieldLabel>
              <Input
                {...register("cityState")}
                placeholder="City/State"
                aria-invalid={errors.cityState ? "true" : undefined}
              />
              <FieldError errors={[errors.cityState]} />
            </Field>

            <Field
              columns={6}
              data-invalid={Boolean(errors.postalCode)}
              className="gap-1.5"
            >
              <FieldLabel>Postal Code</FieldLabel>
              <Input
                {...register("postalCode")}
                placeholder="Postal Code"
                aria-invalid={errors.postalCode ? "true" : undefined}
              />
              <FieldError errors={[errors.postalCode]} />
            </Field>

            <Field
              columns={6}
              data-invalid={Boolean(errors.taxId)}
              className="gap-1.5"
            >
              <FieldLabel>TAX ID</FieldLabel>
              <Input
                {...register("taxId")}
                placeholder="TAX ID"
                aria-invalid={errors.taxId ? "true" : undefined}
              />
              <FieldError errors={[errors.taxId]} />
            </Field>
          </div>

          <DialogFooter className="mx-0 mb-0 gap-3 p-0 pt-2 sm:justify-end">
            <DialogClose
              render={
                <Button variant="outline" type="button">
                  Close
                </Button>
              }
            />
            <Button type="submit" disabled={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
