"use client";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import ThemeToggler from "@/components/common/theme-toggler";
import {Link} from "@/i18n/navigation";
import {PageIcon} from "@/icons";
import {cn} from "@/utils";
import type {Error404Props} from "./types";
export default function Error404({title,description,homeLinkText,homeHref="/",className}:Error404Props){const t=useTranslations("notFound");return <div className={cn("em-error-page",className)}><header className="em-error-header"><Link href="/" className="sec-wordmark">VULN</Link><ThemeToggler/></header><main className="em-error-content"><PageIcon className="size-10" aria-hidden="true"/><span className="sec-code">404</span><h1>{title||t("title")}</h1><p>{description||t("message")}</p><Button nativeButton={false} render={<Link href={homeHref}/>}>{homeLinkText||t("backHome")}</Button></main></div>;}
