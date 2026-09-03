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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ltv-academy.netlify.app"
  ),
  title: "Lifting the Veil — Information Technology Academy",
  description:
    "Live, instructor-led IT training since 2017. Nine tracks — SQL Server & BI, Oracle Financials, Salesforce, Data Science and more. Learn the work. Get the job.",
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/icon-512.png",
  },
  openGraph: {
    title: "Lifting the Veil — Information Technology Academy",
    description:
      "Live, instructor-led IT training since 2017. Learn the work. Get the job.",
    images: ["/brand/ltv-logo-still.png"],
  },
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
