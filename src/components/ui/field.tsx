"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, useId, useMemo } from "react";

interface FieldContextValue {
  id: string;
}

const FieldContext = createContext<FieldContextValue | undefined>(undefined);

function useField() {
  return useContext(FieldContext);
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn("em-field-legend", className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva("group/field em-field flex w-full gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

interface FieldProps
  extends React.ComponentProps<"div">, VariantProps<typeof fieldVariants> {
  controlId?: string;
  columns?: 3 | 4 | 6 | 8 | 12;
}

function Field({
  className,
  orientation = "vertical",
  controlId,
  columns = 12,
  id: divId,
  children,
  ...props
}: FieldProps) {
  const generatedId = useId();
  const id = controlId ?? generatedId;
  const contextValue = useMemo(() => ({ id }), [id]);

  return (
    <FieldContext.Provider value={contextValue}>
      <div
        role="group"
        id={divId}
        data-slot="field"
        data-columns={columns}
        data-orientation={orientation}
        className={cn(fieldVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  htmlFor,
  ...props
}: React.ComponentProps<typeof Label>) {
  const field = useField();
  const resolvedHtmlFor = htmlFor ?? field?.id;

  return (
    <Label
      data-slot="field-label"
      htmlFor={resolvedHtmlFor}
      className={cn(
        "group/field-label peer/field-label em-field-label",
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn("em-field-label", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const field = useField();
  return (
    <p
      data-slot="field-description"
      id={field ? `${field.id}-description` : undefined}
      className={cn("em-field-description", className)}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="em-field-separator-content"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const field = useField();
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ms-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      id={field ? `${field.id}-error` : undefined}
      className={cn("em-field-error", className)}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldContext,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  useField,
};
