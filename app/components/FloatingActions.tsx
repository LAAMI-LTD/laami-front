"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`w-11 h-11 rounded-full border border-[#004d98] text-[#004d98]
          bg-white/90 backdrop-blur-sm shadow-lg
          hover:bg-[#004d98] hover:text-white
          transition-all duration-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <ArrowUp className="w-5 h-5 mx-auto" />
      </button>

      {/* WhatsApp with proper green */}
      <a
        href="https://wa.me/254711372214"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 rounded-full border border-[#25D366] text-[#25D366]
    bg-white/90 backdrop-blur-sm shadow-lg
    hover:bg-[#25D366] hover:text-white
    transition-all duration-300
    flex items-center justify-center group relative"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
