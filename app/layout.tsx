import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: '#f9f9f7',
}

const siteUrl = 'https://plunge-lite.netlify.app'
const title = 'Plunge Lite｜朝30秒で集中力が変わる'
const description =
  '朝のぬるさを卒業。30秒の新習慣で、1日の集中力が変わる。現在、プロダクト開発にご協力いただけるβテスターを募集しています。'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Plunge Lite',
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Plunge Lite',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    title: 'Plunge Lite',
    statusBarStyle: 'default',
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body className="font-body text-on-surface antialiased min-h-full">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
