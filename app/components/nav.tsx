"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Facebook, Instagram, Mail, Menu, MessageCircle, Phone, X, Youtube } from "lucide-react";

interface NavProps { scrolled: boolean }

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
];

const socials = [
  { href: "https://www.instagram.com/laamilabs", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/share/1Zv7PtL4T3/", label: "Facebook", icon: Facebook },
  { href: "https://youtube.com/@laamilabs", label: "YouTube", icon: Youtube },
  { href: "https://whatsapp.com/channel/0029Vb7iPseEawdqBdD7Uc1A", label: "WhatsApp", icon: MessageCircle },
  { href: "mailto:hello@laamilabs.co.ke", label: "Email", icon: Mail },
  { href: "tel:+254707848528", label: "Phone", icon: Phone },
];

export default function Nav({ scrolled }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-800" : "bg-gray-950/40 backdrop-blur-sm"}`}>
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <Image src="/laami.png" alt="LAAMI LABS logo, a division of LAAMI LTD" width={42} height={42} priority />
              <div>
                <div className="text-xl md:text-2xl font-bold tracking-tight leading-tight"><span className="text-[#004d98]">LAAMI</span><span className="text-[#a50044]">LTD</span></div>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
              {links.map((link) => <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition text-sm lg:text-base">{link.label}</Link>)}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contacts" className="px-4 py-2 font-semibold rounded-md text-white bg-[#a50044] hover:bg-[#004d98] transition">Reach us <ChevronRight className="inline w-4 h-4" /></Link>
              {socials.slice(0, 3).map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-gray-400 hover:text-white"><Icon className="w-5 h-5" /></a>)}
            </div>
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" className="md:hidden p-2 rounded-md bg-gray-900 hover:bg-[#004d98] transition"><Menu className="w-5 h-5 text-gray-300" /></button>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && <div className="fixed inset-0 z-[60] md:hidden flex flex-col bg-gray-950 text-white">
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-bold text-lg">LAAMI LTD</Link>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md bg-gray-800"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-2xl font-medium text-gray-300 hover:text-white"><span>{link.label}</span><ChevronRight className="w-5 h-5 text-[#004d98]" /></Link>)}
          <Link href="/contacts" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center px-6 py-3 font-semibold rounded-md bg-[#a50044]">Reach us <ChevronRight className="ml-2 w-5 h-5" /></Link>
          <div className="flex gap-5 border-t border-gray-800 pt-6">{socials.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon className="w-5 h-5" /></a>)}</div>
        </div>
        <div className="py-6 text-center text-xs text-gray-500 border-t border-gray-800">&copy; {new Date().getFullYear()} LAAMI LTD</div>
      </div>}
    </>
  );
}
