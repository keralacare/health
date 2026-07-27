import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AssessmentProvider } from "@/lib/assessment-context";
import { I18nProvider } from "@/lib/i18n-context";
import { RumInit } from "@/components/analytics/rum-init";
import { Noto_Sans_Tamil, Inter } from "next/font/google";

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-sans-tamil",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Makkalai Thedi Maruthuvam - NCD Cascade Care",
  description:
    "Evaluation of Non-Communicable Disease Cascade Care under Makkalai Thedi Maruthuvam in Tamil Nadu.",
  metadataBase: new URL("https://health.tn.gov.in"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Makkalai Thedi Maruthuvam - NCD Cascade Care",
    description:
      "A cross-sectional study on Non-Communicable Disease Cascade Care under Makkalai Thedi Maruthuvam in Tamil Nadu.",
    url: "https://health.tn.gov.in",
    siteName: "Makkalai Thedi Maruthuvam",
    locale: "ta_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makkalai Thedi Maruthuvam - NCD Cascade Care",
    description:
      "Evaluation of NCD Cascade Care under Makkalai Thedi Maruthuvam in Tamil Nadu.",
  },
  keywords: [
    "health assessment",
    "health risk",
    "Tamil Nadu health",
    "preventive healthcare",
    "wellness check",
    "health screening",
    "tamilnadu health",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${notoSansTamil.variable}`}>
      <body className={`antialiased min-h-screen bg-slate-50`}>
        <RumInit />
        <I18nProvider>
          <AssessmentProvider>{children}</AssessmentProvider>
        </I18nProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
