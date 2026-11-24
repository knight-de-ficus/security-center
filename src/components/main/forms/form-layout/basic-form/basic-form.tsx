"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { basicFormSchema, type BasicFormData } from "./schema";

export default function BasicFormContent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BasicFormData>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="em-form-grid">
        <Field columns={6} data-invalid={Boolean(errors.name)}>
          <FieldLabel>Name</FieldLabel>
          <Input
            {...register("name")}
            type="text"
            placeholder="Name"
            aria-label="Name"
            aria-invalid={errors.name ? "true" : undefined}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field columns={6} data-invalid={Boolean(errors.email)}>
          <FieldLabel>Email address</FieldLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            aria-invalid={errors.email ? "true" : undefined}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={Boolean(errors.password)} columns={12}>
          <FieldLabel>Password</FieldLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-invalid={errors.password ? "true" : undefined}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        <Field data-invalid={Boolean(errors.confirmPassword)} columns={12}>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-invalid={errors.confirmPassword ? "true" : undefined}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>

        <Button
          type="submit"
          className="em-span-12 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
