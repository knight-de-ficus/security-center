"use client";
import { Link } from "@/i18n/navigation";
import { ChevronRightIcon } from "@/icons";
interface BreadcrumbProps {
  pageTitle: string;
  variant?: "default" | "security";
  description?: string;
  action?: React.ReactNode;
  homeLabel?: string;
  showBreadcrumb?: boolean;
}
export default function PageBreadcrumb({
  pageTitle,
  description,
  action,
  homeLabel,
  showBreadcrumb = true,
}: BreadcrumbProps) {
  return (
    <header className="sec-page-header">
      <div>
        {showBreadcrumb && homeLabel && (
          <nav aria-label={homeLabel} className="sec-breadcrumb">
            <Link href="/">{homeLabel}</Link>
            <ChevronRightIcon className="size-3 rtl:rotate-180" />
            <span>{pageTitle}</span>
          </nav>
        )}
        <h1>{pageTitle}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="sec-page-actions">{action}</div>}
    </header>
  );
}
