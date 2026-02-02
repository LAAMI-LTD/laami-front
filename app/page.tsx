"use client";

import { useState, useEffect } from "react";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Services from "./components/services";
import About from "./components/about";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav scrolled={scrolled} />
      <Hero />
      <Services />
      <About />
      <CTA />
      <Footer />
    </div>
  );
}