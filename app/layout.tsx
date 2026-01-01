import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AssessmentProvider } from "@/lib/assessment-context";
import { I18nProvider } from "@/lib/i18n-context";
import { RumInit } from "@/components/analytics/rum-init";
import { Anek_Malayalam, Inter } from "next/font/google";

const anekMalayalam = Anek_Malayalam({
  subsets: ["latin"],
  variable: "--font-anek-malayalam",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Vibe 4 Wellness - Health Risk Assessment",
  description:
    "Check your health risks in 5 minutes. A free, private health risk assessment tool.",
  metadataBase: new URL("https://health.kerala.care"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Vibe 4 Wellness - Health Risk Assessment",
    description:
      "Check your health risks in 5 minutes. Free, private health risk assessment tool. Eat well · Act well · Sleep well · Care well",
    url: "https://health.kerala.care",
    siteName: "Vibe 4 Wellness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe 4 Wellness - Health Risk Assessment",
    description:
      "Check your health risks in 5 minutes. Free, private health risk assessment tool.",
  },
  keywords: [
    "health assessment",
    "health risk",
    "Kerala health",
    "preventive healthcare",
    "wellness check",
    "health screening",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${anekMalayalam.variable}`}>
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
