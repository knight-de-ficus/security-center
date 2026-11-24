"use client";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileInput } from "@/components/ui/file-input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
export default function FeedbackGallery() {
  const t = useTranslations("security.workbench.gallery");
  return (
    <section
      id="feedback-specimens"
      className="em-grid"
      aria-label={t("feedback")}
    >
      <Card columns={8}>
        <CardHeader>
          <CardTitle>{t("feedback")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <div className="em-control-row">
            <Badge color="primary">{t("ready")}</Badge>
            <Badge color="success">{t("saved")}</Badge>
            <Badge color="error">{t("error")}</Badge>
            <Badge color="warning">{t("invalid")}</Badge>
          </div>
          <Alert variant="info">
            <AlertTitle>{t("ready")}</AlertTitle>
            <AlertDescription>{t("notes")}</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>{t("invalid")}</AlertTitle>
            <AlertDescription>{t("error")}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <Card columns={4}>
        <CardHeader>
          <CardTitle>{t("identity")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <div className="em-control-row">
            <Avatar>
              <AvatarFallback>LC</AvatarFallback>
            </Avatar>
            <span>Lin Chen</span>
          </div>
          <label className="em-choice">
            <Switch defaultChecked />
            {t("checked")}
          </label>
          <label className="em-choice">
            <Switch disabled />
            {t("disabled")}
          </label>
        </CardContent>
      </Card>
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
      <Card columns={6}>
        <CardHeader>
          <CardTitle>{t("upload")}</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="em-gallery-stack">
            {t("upload")}
            <FileInput />
          </label>
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
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("table")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>{t("name")}</TableCell>
                <TableCell isHeader>{t("state")}</TableCell>
                <TableCell isHeader className="em-numeric">
                  {t("count")}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>VUL-2048</TableCell>
                <TableCell>
                  <Badge color="error">Critical</Badge>
                </TableCell>
                <TableCell className="em-numeric">6</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>VUL-2047</TableCell>
                <TableCell>
                  <Badge color="warning">High</Badge>
                </TableCell>
                <TableCell className="em-numeric">12</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
