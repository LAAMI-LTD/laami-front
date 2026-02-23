"use client";

import { useEffect, useState } from "react";
import Nav from "./nav";

export default function NavWrapper() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <Nav scrolled={scrolled} />;
}
