import ThemeToggler from "@/components/common/theme-toggler";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="em-auth-grid">
      <section data-columns={6} className="em-auth-content">
        {children}
      </section>
      <aside data-columns={6} className="em-auth-brand">
        <Link href="/" className="sec-wordmark">
          <span className="sec-mark" aria-hidden="true">
            v<span>/</span>
          </span>
          <span>VULN</span>
        </Link>
      </aside>
      <div className="em-auth-theme">
        <ThemeToggler />
      </div>
    </main>
  );
}
