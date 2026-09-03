import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ltv-academy.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lifting the Veil — Information Technology Academy",
    template: "%s · Lifting the Veil Academy",
  },
  description:
    "Live, instructor-led IT training since 2017. Nine tracks — SQL Server & BI, Oracle Financials, Salesforce, Data Science, Data Engineering, DevOps and more. Learn the work. Get the job.",
  keywords: [
    "IT training",
    "IT bootcamp",
    "SQL Server training",
    "business intelligence course",
    "Oracle Financials training",
    "Salesforce administrator course",
    "Salesforce architect training",
    "data science course",
    "data engineering course",
    "data analytics course",
    "DevOps training",
    "blockchain development course",
    "live online IT classes",
    "career change to IT",
    "Lifting the Veil Academy",
    "LTV Academy",
    "Bill Green",
  ],
  applicationName: "Lifting the Veil Academy",
  authors: [{ name: "Lifting the Veil Academy" }],
  creator: "Lifting the Veil Academy",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/icon-512.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Lifting the Veil Academy",
    title: "Lifting the Veil — Information Technology Academy",
    description:
      "Live, instructor-led IT training since 2017. Nine all-access tracks, nightly and Saturday classes, every session recorded. Learn the work. Get the job.",
    images: [
      {
        url: "/brand/ltv-logo-still.png",
        width: 544,
        height: 544,
        alt: "Lifting the Veil Academy seal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifting the Veil — Information Technology Academy",
    description:
      "Live, instructor-led IT training since 2017. Nine all-access tracks. Learn the work. Get the job.",
    images: ["/brand/ltv-logo-still.png"],
  },
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
