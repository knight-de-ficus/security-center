import ThemeToggler from "@/components/common/theme-toggler";
import { Link } from "@/i18n/navigation";
export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <main className="em-auth-grid"><section data-columns={6} className="em-auth-content">{children}</section><aside data-columns={6} className="em-auth-brand"><Link href="/" className="sec-wordmark"><span className="sec-mark" aria-hidden="true">v<span>/</span></span><span>VULN</span></Link></aside><div className="em-auth-theme"><ThemeToggler/></div></main>;
}
