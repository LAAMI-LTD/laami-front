"use client";

import Hero from "./components/hero";
import Services from "./components/services";
import About from "./components/about";
import CTA from "./components/cta";
import Footer from "./components/footer";
import Script from "next/script";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LAAMI LTD",
    legalName: "LAAMI LTD",
    url: "https://laamilabs.co.ke",
    brand: "LAAMI LABS",
    department: {
      "@type": "Organization",
      name: "LAAMI LABS",
      url: "https://laamilabs.co.ke",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Eldoret",
      addressRegion: "KE",
      addressCountry: "Kenya",
    },
    sameAs: [
      "https://www.facebook.com/share/1Zv7PtL4T3/",
      "https://www.instagram.com/laamilabs",
    ],
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-black text-white">
        <Hero />
        <Services />
        <About />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
