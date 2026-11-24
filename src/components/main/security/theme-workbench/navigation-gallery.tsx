"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
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

export default function NavigationGallery() {
  const t = useTranslations("security.workbench.gallery");
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(48);
  const [action, setAction] = useState("");
  const choices = [t("one"), t("two"), t("three")];
  return (
    <section
      id="navigation-specimens"
      className="em-grid"
      aria-label={t("navigation")}
    >
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("combinations")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <ButtonGroup aria-label={t("combinations")}>
            <Button variant="outline" onClick={() => setAction(t("one"))}>
              {t("one")}
            </Button>
            <Button variant="outline" onClick={() => setAction(t("two"))}>
              {t("two")}
            </Button>
            <Button variant="outline" onClick={() => setAction(t("three"))}>
              {t("three")}
            </Button>
          </ButtonGroup>
          <ToggleGroup
            defaultValue={["one"]}
            variant="outline"
            spacing={0}
            aria-label={t("selection")}
          >
            <ToggleGroupItem value="one">{t("one")}</ToggleGroupItem>
            <ToggleGroupItem value="two">{t("two")}</ToggleGroupItem>
            <ToggleGroupItem value="three">{t("three")}</ToggleGroupItem>
          </ToggleGroup>
          <div className="em-control-row">
            <Toggle variant="outline">{t("checked")}</Toggle>
            <Toggle disabled>{t("disabled")}</Toggle>
          </div>
          <p role="status" className="em-description">
            {action || t("ready")}
          </p>
        </CardContent>
      </Card>
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
          <div className="em-control-row">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                {t("menu")}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setAction(t("saved"))}>
                  {t("save")}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>{t("disabled")}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setAction(t("reset"))}
                >
                  {t("reset")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                {t("drawer")}
              </SheetTrigger>
              <SheetContent closeLabel={t("close")}>
                <SheetHeader>
                  <SheetTitle>{t("drawer")}</SheetTitle>
                  <SheetDescription>{t("notes")}</SheetDescription>
                </SheetHeader>
                <label className="em-gallery-stack">
                  {t("name")}
                  <InputGroup>
                    <InputGroupInput defaultValue="VUL-2048" />
                  </InputGroup>
                </label>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>
                    {t("close")}
                  </SheetClose>
                  <SheetClose render={<Button />}>{t("save")}</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
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
          <CardTitle>{t("disclosure")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible>
            <CollapsibleTrigger render={<Button variant="outline" />}>
              {t("notes")}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="em-disclosure-copy">{t("disclosureBody")}</p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("navigation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination aria-label={t("navigation")}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text={t("previous")}
                  aria-label={t("previous")}
                  disabled={page === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page - 1);
                  }}
                  href="#gallery-pagination"
                />
              </PaginationItem>
              {[1, 2, 3].map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#gallery-pagination"
                    isActive={page === n}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(n);
                    }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  text={t("next")}
                  aria-label={t("next")}
                  disabled={page === 3}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  href="#gallery-pagination"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("panels")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResizablePanelGroup
            orientation="horizontal"
            className="em-panel-example"
          >
            <ResizablePanel defaultSize="50%" minSize="25%">
              <ScrollArea className="em-scroll-example">
                <div className="em-gallery-stack">
                  {Array.from({ length: 8 }, (_, i) => (
                    <p key={i}>
                      {t("name")} · VUL-{2048 - i}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="50%" minSize="25%">
              <div className="em-panel-copy">{t("notes")}</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </section>
  );
}
