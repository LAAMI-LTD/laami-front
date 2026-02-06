"use client";

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Contact from "./form";
import CCTA from "./contactheader";

export default function Contacts() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className="min-h-screen bg-white dark:bg-[#000213] transition-colors duration-300">
      <CCTA />
      <Contact
        facebookUrl="https://www.facebook.com/share/1Zv7PtL4T3/"
        instagramUrl="https://www.instagram.com/laamilabs?igsh=ZndvbzF2bzc5NWtr"
      />
      <Footer />
    </main>
  );
}
