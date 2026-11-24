"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@/i18n/navigation";
import { BellIcon, DotIcon, XIcon } from "@/icons";
import { cn, getInitials } from "@/utils";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { notifications } from "./data";

export default function NotificationDropdown() {
  const t = useTranslations("header.notifications");
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setNotifying(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="tailadmin-header-action relative"
            aria-label="Toggle notifications"
          >
            <span
              className={cn(
                "em-notification-dot",
                !notifying ? "hidden" : "flex",
              )}
            ></span>
            <BellIcon className="size-auto!" />
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="tailadmin-header-menu em-surface w-87.5 overflow-hidden p-3 sm:w-90.25"
      >
        <div className="flex items-center justify-between pb-3">
          <h5 className="text-title-sm font-semibold text-foreground dark:text-foreground">
            {t("title")}
          </h5>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsOpen(false)}
            aria-label="Close notifications"
          >
            <XIcon className="size-5" />
          </Button>
        </div>

        <DropdownMenuSeparator className="my-0" />

        <ScrollArea className="h-96">
          <div className="flex flex-col pe-2">
            {notifications.map((item) => (
              <Fragment key={item.id}>
                <DropdownMenuItem className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-background/5">
                  <Avatar size="default">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
                    <AvatarBadge variant={item.status} />
                  </Avatar>
                  <span className="block flex-1 text-start">
                    <span className="mb-1.5 block space-x-1 text-sm text-muted-foreground dark:text-gray-400">
                      <span className="font-medium text-foreground dark:text-foreground">
                        {item.name}
                      </span>{" "}
                      <span>{t(item.actionKey)}</span>{" "}
                      <span className="font-medium text-foreground dark:text-foreground">
                        {item.project}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-400">
                      <span>{t("project")}</span>
                      <DotIcon className="size-2 text-gray-400 dark:text-muted-foreground" />
                      <span>{t(item.timeKey, { count: item.timeCount })}</span>
                    </span>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-0.5 bg-gray-100 last-of-type:hidden dark:bg-gray-100" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>

        <Button
          variant="outline"
          size="default"
          nativeButton={false}
          render={<Link href="/" />}
          className="mt-3 w-full"
          onClick={() => setIsOpen(false)}
        >
          {t("viewAll")}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
