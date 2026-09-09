import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { themeInitializationScript } from "@/lib/theme";
import {
  PRODUCTION_ORIGIN,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SOCIAL_IMAGE,
} from "@/lib/seo";

const syneFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_ORIGIN),
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: SOCIAL_IMAGE.url,
    apple: SOCIAL_IMAGE.url,
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    siteName: "Piyush Sontakke Portfolio",
    locale: "en_IN",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    creator: "@PiyushSontakke4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${syneFont.variable} ${interFont.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        {children}
      </body>
    </html>
  );
}
