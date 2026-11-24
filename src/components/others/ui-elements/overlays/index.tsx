"use client";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverBody,
} from "@/components/ui/popover";
import { useState } from "react";
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
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
export default function OverlayExamples() {
  const t = useTranslations("security.workbench.gallery");
  const [action, setAction] = useState("");
  return (
    <section className="em-grid em-example-grid">
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("overlays")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="em-control-row">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                {t("dialog")}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("dialog")}</DialogTitle>
                  <DialogDescription>{t("notes")}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    {t("reset")}
                  </DialogClose>
                  <DialogClose render={<Button />}>{t("save")}</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                {t("popover")}
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{t("popover")}</PopoverTitle>
                </PopoverHeader>
                <PopoverBody>{t("notes")}</PopoverBody>
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                {t("tooltip")}
              </TooltipTrigger>
              <TooltipContent>{t("notes")}</TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("menu")}</CardTitle>
        </CardHeader>
        <CardContent>
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
          <p role="status">{action || t("ready")}</p>
        </CardContent>
      </Card>
    </section>
  );
}
