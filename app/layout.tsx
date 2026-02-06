import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingActions from "./components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laami Labs | BUILDING WHAT COMPANIES RUN ON",
  description:
    "Laami Labs builds scalable web and mobile applications, professional brand identities, and helps startups and organizations establish credible, mission-driven digital presence.",

  keywords: [
    "Laami Labs",
    "Web development Kenya",
    "Mobile app development",
    "Brand identity design",
    "Digital solutions",
    "Startup support",
    "Business formation",
    "Mission-driven organizations",
    "Professional branding",
    "Scalable software"
  ],

  authors: [
    { name: "Laami Labs", url: "https://laamilabs.co.ke" }
  ],

  openGraph: {
    title: "Laami Labs | Digital Solutions, Branding & Web/Mobile Apps",
    description:
      "Laami Labs builds scalable web and mobile applications, professional brand identities, and helps startups and organizations establish credible, mission-driven digital presence.",
    url: "https://laamilabs.co.ke",
    siteName: "Laami Labs",
    images: [
      {
        url: "https://laamilabs.co.ke/og-image.png",
        width: 1200,
        height: 630,
        alt: "Laami Labs — Digital Solutions, Branding & Apps"
      }
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Laami Labs | Digital Solutions, Branding & Web/Mobile Apps",
    description:
      "We help startups and organizations establish professional, scalable digital platforms and branding.",
    images: ["https://laamilabs.co.ke/og-image.png"],
    site: "@LaamiLabs",
    creator: "@LaamiLabs",
  },

  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
