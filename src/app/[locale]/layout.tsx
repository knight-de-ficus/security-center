import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme-context";
import { isRtl } from "@/i18n/languages";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/utils";
import { editorialThemeBootstrap } from "@/utils/editorial-theme";
import Script from "next/script";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import "flatpickr/dist/flatpickr.css";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import "simplebar-react/dist/simplebar.min.css";
import "swiper/css/bundle";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  fallback: ["Microsoft YaHei", "system-ui", "sans-serif"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const rtl = isRtl(locale as Locale);

  return (
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={cn(
          "em-body relative isolate",
          outfit.className,
          outfit.variable,
        )}
      >
        <Script id="editorial-theme" strategy="beforeInteractive">
          {editorialThemeBootstrap}
        </Script>
        <NextIntlClientProvider>
          <ThemeProvider>
            <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
              <TooltipProvider>{children}</TooltipProvider>
            </DirectionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
