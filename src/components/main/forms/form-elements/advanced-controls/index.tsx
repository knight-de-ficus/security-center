"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function AdvancedControls() {
  const t = useTranslations("security.workbench.gallery");
  const [range, setRange] = useState(48);
  const choices = [t("one"), t("two"), t("three")];
  return (
    <section className="em-grid em-example-grid">
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("searchSelect")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <Combobox items={choices}>
            <ComboboxInput
              aria-label={t("searchSelect")}
              placeholder={t("placeholder")}
              showClear
            />
            <ComboboxContent>
              <ComboboxEmpty>{t("empty")}</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput aria-label={t("name")} placeholder="example.com" />
          </InputGroup>
        </CardContent>
      </Card>
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("range")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <label className="em-inline-label" htmlFor="gallery-range">
            {t("progress")} · <output>{range}%</output>
          </label>
          <Slider
            id="gallery-range"
            aria-label={t("range")}
            value={range}
            onValueChange={(value) =>
              setRange(Array.isArray(value) ? value[0] : value)
            }
          />
          <Slider aria-label={t("disabled")} defaultValue={24} disabled />
          <div className="em-control-row" role="status">
            <Spinner aria-label={t("loadingState")} />
            {t("loadingState")}
          </div>
        </CardContent>
      </Card>
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("otp")}</CardTitle>
        </CardHeader>
        <CardContent>
          <InputOTP maxLength={4} aria-label={t("otp")}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
      </Card>
    </section>
  );
}
