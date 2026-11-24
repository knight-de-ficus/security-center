"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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
interface NavigationControlsProps {
  page: number;
  onPageChange: (page: number) => void;
}
export default function NavigationControls({
  page,
  onPageChange,
}: NavigationControlsProps) {
  const t = useTranslations("security.workbench.gallery");
  return (
    <>
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
      <Card columns={6}>
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
                    onPageChange(page - 1);
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
                      onPageChange(n);
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
                    onPageChange(page + 1);
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
    </>
  );
}
