"use client";

import { Menu, X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavProps {
  scrolled: boolean;
}

// Mobile Menu Component
const MobileMenuContent = ({ onClose }: { onClose: () => void }) => {
  const navLinks = {
    regular: [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Portfolio" },
    ],
    cta: { href: "/contacts", label: "Reach Out" },
  };

  return (
    <div className="fixed inset-0 z-70 md:hidden flex flex-col bg-gray-950">
      {/* Top Bar */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800 shrink-0 bg-gray-950/90">
        <span className="font-bold text-white text-lg">
          LAAMI<span className="text-[#a50044]">LABS</span>
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-md bg-gray-800 hover:bg-[#004d98] transition"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Centered Navigation */}
      <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
        {navLinks.regular.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center justify-between text-3xl font-light text-gray-300 hover:text-white transition group"
          >
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              {link.label}
            </span>
            <ChevronRight className="w-6 h-6 text-[#004d98] group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        ))}

        <Link
          href={navLinks.cta.href}
          onClick={onClose}
          className="mt-10 bg-gradient-to-r from-[#a50044] to-[#004d98] text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center transition hover:shadow-lg hover:shadow-[#a50044]/20"
        >
          {navLinks.cta.label}
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Footer */}
      <div className="pb-6 text-center text-xs text-gray-500 flex-shrink-0 bg-gray-950/90">
        Precision Digital Solutions
      </div>
    </div>
  );
};

export default function Nav({ scrolled }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  // Check screen width for super wide monitors
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth >= 1920);
    };
    
    // Initial check
    checkScreenWidth();
    
    // Add event listener
    window.addEventListener('resize', checkScreenWidth);
    
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = {
    regular: [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Portfolio" },
    ],
    cta: { href: "/contacts", label: "Reach Out" },
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-800"
            : "bg-gray-950/40"
        }`}
      >
        {/* Container with responsive max-widths */}
        <div className={`
          mx-auto px-4 sm:px-6 
          ${isWideScreen ? 'max-w-[90rem] 2xl:max-w-[100rem] 3xl:max-w-[120rem]' : 'max-w-7xl'}
          lg:px-8
        `}>
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-[#004d98] bg-gray-900 flex items-center justify-center">
                <Image
                  src="/laami.png"
                  alt="Laami Labs Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">
                  LAAMI<span className="text-[#a50044]">LABS</span>
                </span>
                <span className="hidden md:block text-xs font-medium tracking-widest text-gray-400 uppercase -mt-0.5">
                  Building What Companies Run On
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Enhanced for wide screens */}
            <div className="hidden md:flex items-center space-x-6 xl:space-x-8">
              {navLinks.regular.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 font-medium text-gray-300 hover:text-white transition-colors group text-base lg:text-lg xl:text-lg"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#004d98] group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}

              <Link
                href={navLinks.cta.href}
                className="px-6 py-2.5 font-semibold rounded-md text-white bg-[#a50044] hover:bg-[#004d98] transition-all flex items-center text-base lg:text-lg xl:px-8 xl:py-3"
              >
                {navLinks.cta.label}
                <ChevronRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md bg-gray-900 hover:bg-[#004d98] transition"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <MobileMenuContent onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}