"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress-bar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function PrimitiveGallery() {
  const t = useTranslations("security.workbench.gallery");
  const [selection, setSelection] = useState("one");
  return (
    <section
      id="primitive-specimens"
      className="em-grid"
      aria-label={t("title")}
    >
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("selection")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="em-control-row">
            <Input aria-label={t("name")} placeholder={t("placeholder")} />
            <Select
              value={selection}
              onValueChange={(value) => value && setSelection(String(value))}
            >
              <SelectTrigger aria-label={t("selection")}>
                <SelectValue>
                  {t(selection === "one" ? "optionOne" : "optionTwo")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">{t("optionOne")}</SelectItem>
                <SelectItem value="two">{t("optionTwo")}</SelectItem>
              </SelectContent>
            </Select>
            <Button>{t("save")}</Button>
          </div>
        </CardContent>
      </Card>
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("tabs")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">{t("optionOne")}</TabsTrigger>
              <TabsTrigger value="two">{t("optionTwo")}</TabsTrigger>
            </TabsList>
            <TabsContent value="one">{t("notes")}</TabsContent>
            <TabsContent value="two">{t("ready")}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("accordion")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion>
            <AccordionItem value="one">
              <AccordionTrigger>{t("optionOne")}</AccordionTrigger>
              <AccordionContent>{t("notes")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="two">
              <AccordionTrigger>{t("optionTwo")}</AccordionTrigger>
              <AccordionContent>{t("ready")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("loading")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <Skeleton className="h-6 w-32" />
          <Separator />
          <p>{t("ready")}</p>
        </CardContent>
      </Card>
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("fields")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <label>
            {t("name")}
            <Input placeholder={t("placeholder")} />
          </label>
          <label>
            {t("disabled")}
            <Input disabled defaultValue={t("disabled")} />
          </label>
          <label>
            {t("invalid")}
            <Input aria-invalid="true" aria-describedby="gallery-error" />
            <span className="em-field-error" id="gallery-error">
              {t("error")}
            </span>
          </label>
        </CardContent>
      </Card>
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("textarea")}</CardTitle>
        </CardHeader>
        <CardContent>
          <label>
            {t("notes")}
            <Textarea placeholder={t("placeholder")} />
          </label>
        </CardContent>
        <CardFooter>
          <Button variant="outline">{t("secondary")}</Button>
        </CardFooter>
      </Card>
      <Card columns={4}>
        <CardHeader>
          <CardTitle>{t("checkbox")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <label className="em-choice">
            <Checkbox defaultChecked />
            {t("checked")}
          </label>
          <label className="em-choice">
            <Checkbox />
            {t("unchecked")}
          </label>
          <label className="em-choice">
            <Checkbox disabled />
            {t("disabled")}
          </label>
          <label className="em-choice">
            <Checkbox indeterminate />
            {t("mixed")}
          </label>
        </CardContent>
      </Card>
      <Card columns={4}>
        <CardHeader>
          <CardTitle>{t("radio")}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="one">
            <label className="em-choice">
              <RadioGroupItem value="one" />
              {t("optionOne")}
            </label>
            <label className="em-choice">
              <RadioGroupItem value="two" />
              {t("optionTwo")}
            </label>
          </RadioGroup>
        </CardContent>
      </Card>
      <Card columns={4}>
        <CardHeader>
          <CardTitle>{t("progress")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <span>48 / 100</span>
          <Progress value={48} aria-label={t("progress")} />
          <span>0 / 100</span>
          <Progress value={0} aria-label={t("zero")} />
        </CardContent>
      </Card>
    </section>
  );
}
