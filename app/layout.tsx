// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingActions from "./components/FloatingActions";
import FirebaseAnalytics from "./components/FirebaseAnalytics";
import CookieBanner from "./components/CookieBanner";
import NavWrapper from "./components/NavWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Social media URLs
const FACEBOOK_URL = "https://www.facebook.com/share/1Zv7PtL4T3/";
const INSTAGRAM_URL =
  "https://www.instagram.com/laamilabs?igsh=ZndvbzF2bzc5NWtr";
const WEBSITE_URL = "https://laamilabs.co.ke";

export const metadata: Metadata = {
  title: "LAAMI LTD | LAAMI LABS — Building What Companies Run On",
  description:
    "LAAMI LTD is the parent company of LAAMI LABS. We build web and mobile apps, brand identities, and digital solutions for startups and organisations across Kenya and Africa.",

  keywords: [
    // Core company names
    "LAAMI LTD",
    "Laami Ltd",
    "LAAMI LABS",
    "Laami Labs",
    "Laami Labs division of LAAMI LTD",

    // Branded searches
    "Laami Ltd Kenya",
    "LAAMI LTD Eldoret",
    "Laami Labs co ke",

    // Service keywords
    "Web development Eldoret",
    "Mobile app development Eldoret",
    "Brand identity design Kenya",
    "Digital solutions Africa",
    "Startup support Eldoret",
    "Business formation Eldoret",
    "Mission-driven organizations",
    "Professional branding Africa",
    "Scalable software Eldoret",
    "Tech company Kenya",
    "Software development Eldoret",
  ],

  authors: [
    { name: "Keter Titus", url: "https://ketertitus.vercel.app" },
    { name: "LAAMI LTD", url: WEBSITE_URL },
  ],

  metadataBase: new URL(WEBSITE_URL),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: WEBSITE_URL,
    title: "LAAMI LTD | LAAMI LABS — Building What Companies Run On",
    description:
      "LAAMI LTD (parent company of LAAMI LABS) builds web and mobile apps, strong brand identities, and digital solutions for startups and organisations across Kenya and Africa.",
    siteName: "LAAMI LTD",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LAAMI LTD | LAAMI LABS — Building What Companies Run On",
        type: "image/png",
      },
      {
        url: "/og-image.avif",
        width: 1200,
        height: 630,
        alt: "LAAMI LTD | LAAMI LABS — Building What Companies Run On",
        type: "image/avif",
      },
    ],

    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@LaamiLabs",
    creator: "@LaamiLabs",
    title:
      "LAAMI LTD | LAAMI LABS — Digital Solutions, Branding & Web/Mobile Apps",
    description:
      "LAAMI LTD is the parent company of LAAMI LABS. Building digital solutions and professional branding for startups and organizations in Kenya.",
    images: ["/og-image.avif", "/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  appleWebApp: {
    title: "LAAMI LTD",
    statusBarStyle: "black-translucent",
  },

  appLinks: {
    web: {
      url: WEBSITE_URL,
      should_fallback: true,
    },
    ios: {
      url: INSTAGRAM_URL,
      app_store_id: "389801252",
    },
    android: {
      package: "com.instagram.android",
      app_name: "Instagram",
    },
  },

  other: {
    "og:image:secure_url": `${WEBSITE_URL}/og-image.png`,
    "og:image:type": "image/png",

    "instagram:url": INSTAGRAM_URL,
    "facebook:page": FACEBOOK_URL,
    "og:see_also": [FACEBOOK_URL, INSTAGRAM_URL],

    // Corporate identity
    "business:parent_company": "LAAMI LTD",
    "business:division": "LAAMI LABS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />

        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        <meta property="fb:pages" content="YOUR_FACEBOOK_PAGE_ID" />

        <meta name="instagram:creator" content="@laamilabs" />

        {/* Explicit parent company & division declaration */}
        <meta name="business:parent_company" content="LAAMI LTD" />
        <meta name="business:division" content="LAAMI LABS" />
        <meta name="organization" content="LAAMI LTD" />
        <meta name="legal_name" content="LAAMI LTD" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <link
          rel="preload"
          href="/og-image.avif"
          as="image"
          type="image/avif"
        />
        <link rel="preload" href="/og-image.png" as="image" type="image/png" />

        <meta name="geo.region" content="KE-700" />
        <meta name="geo.placename" content="Eldoret, Kenya" />
        <meta name="geo.position" content="0.5143;35.2698" />
        <meta name="ICBM" content="0.5143, 35.2698" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavWrapper />
        {children}

        <FloatingActions
          facebookUrl={FACEBOOK_URL}
          instagramUrl={INSTAGRAM_URL}
        />

        <CookieBanner />

        <FirebaseAnalytics />
      </body>
    </html>
  );
}
