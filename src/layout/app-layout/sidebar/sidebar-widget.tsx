import { useTranslations } from "next-intl";

export default function SidebarWidget() {
  const t = useTranslations("sidebar.widget");

  return (
    <div className="mx-auto rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-muted">
      <h3 className="mb-2 font-semibold text-foreground dark:text-foreground">
        {t("title")}
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {t("description")}
      </p>
      <a
        href="https://tailadmin.com/pricing"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center rounded-lg bg-brand-500 p-3 text-sm font-medium text-background hover:bg-brand-600"
      >
        {t("purchaseNow")}
      </a>
    </div>
  );
}
