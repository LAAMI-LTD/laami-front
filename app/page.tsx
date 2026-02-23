"use client";

import Hero from "./components/hero";
import Services from "./components/services";
import About from "./components/about";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Services />
      <About />
      <CTA />
      <Footer />
    </div>
  );
}
