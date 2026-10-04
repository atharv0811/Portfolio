import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navigation/navbar";
import { BackToTop } from "@/components/ui/back-to-top";
import { ToastProvider } from "@/components/ui/toast";
import { siteConfig } from "@/data/site-config";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const title = `${siteConfig.name} — Frontend Developer | React & Next.js`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0d" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ToastProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
