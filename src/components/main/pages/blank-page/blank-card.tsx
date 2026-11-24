"use client";
import {useTranslations} from "next-intl";
import {Card,CardTitle} from "@/components/ui/card";
import {Link} from "@/i18n/navigation";
import {cn} from "@/utils";
import type {BlankCardProps} from "./types";
export default function BlankCard({title,description,className}:BlankCardProps){const t=useTranslations("security.workbench.empty");return <Card columns={12} className={cn("em-empty-panel",className)}><CardTitle>{title||t("title")}</CardTitle><p className="em-description">{description||t("description")}</p><Link href="/design-system" className="sec-text-link">{t("action")}</Link></Card>;}
