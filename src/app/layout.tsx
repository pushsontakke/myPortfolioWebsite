import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { themeInitializationScript } from "@/lib/theme";
// import { SpeedInsights } from "@vercel/speed-insights/next"

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
  title: "Portfolio | Piyush Sontakke",
  description: "Product Engineer who ships — not just codes.",
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
      {/* <SpeedInsights/> */}
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
