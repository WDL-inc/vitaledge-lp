import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Japanese + Latin UI font — loaded via next/font for self-hosting & zero layout shift.
// The variable CSS props are injected at runtime via className on <html>.
// globals.css @theme inline uses LITERAL font names (not var()) — see shadcn gotcha.
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitaledge | オフィス訪問型の心・脳健診サービス",
  description:
    "Vitaledgeは、企業の費用負担を抑えながら従業員の心・脳疾患リスクの早期発見を支援する、オフィス訪問型の二次健診サービスです。",
};

const aioBoostSchemaUrls: Record<string, string> = {
  "/": "https://vitaledge.jp/",
  "/privacy": "https://vitaledge.jp/privacy",
  "/terms": "https://vitaledge.jp/terms",
};

function normalizePathname(pathname: string | null) {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

async function getAioBoostLdJson(pathname: string) {
  const pageUrl = aioBoostSchemaUrls[normalizePathname(pathname)];
  if (!pageUrl) return null;

  try {
    const endpoint = `https://tag.aioboost.net/schema?url=${encodeURIComponent(pageUrl)}&site=vitaledge&fast=1`;
    const response = await fetch(endpoint, { cache: "force-cache" });
    if (!response.ok) return null;

    const payload = (await response.json()) as { ldjson?: unknown };
    if (!Array.isArray(payload.ldjson) || payload.ldjson.length === 0) {
      return null;
    }

    return payload.ldjson;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const aioBoostLdJson = await getAioBoostLdJson(
    requestHeaders.get("x-vitaledge-pathname") ?? "/"
  );

  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJ6HQ7NW');`,
          }}
        />
        {aioBoostLdJson ? (
          <script
            type="application/ld+json"
            data-mh-injected="server"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(aioBoostLdJson) }}
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJ6HQ7NW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
