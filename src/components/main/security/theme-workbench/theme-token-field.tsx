"use client";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import type { ThemeToken } from "./types";
interface ThemeTokenFieldProps {
  token: ThemeToken;
  invalid: boolean;
  onChange: (name: string, value: string) => void;
}
export default function ThemeTokenField({
  token,
  invalid,
  onChange,
}: ThemeTokenFieldProps) {
  const t = useTranslations("security.workbench");
  const isColor = token.name.startsWith("--color");
  const errorId = `token-error-${token.name}`;
  return (
    <div
      className="em-token"
      data-columns={4}
      role="group"
      aria-label={token.name}
    >
      <span>
        {token.name
          .replace("--color-sec-", "")
          .replace("--shadow-sec-", "shadow.")}
      </span>
      <div className="em-control-row">
        {isColor &&
          (/^#[0-9a-f]{6}$/i.test(token.value) ? (
            <input
              type="color"
              aria-label={token.name}
              value={token.value}
              onChange={(e) => onChange(token.name, e.target.value)}
            />
          ) : (
            <span
              className="em-token-swatch"
              aria-hidden="true"
              style={{ backgroundColor: token.value }}
            />
          ))}
        <Input
          aria-label={`${token.name} CSS`}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          key={token.value}
          defaultValue={token.value}
          onBlur={(e) => onChange(token.name, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
        />
      </div>
      {invalid && (
        <span id={errorId} role="alert" className="em-field-error">
          {t("invalidValue")}
        </span>
      )}
    </div>
  );
}
