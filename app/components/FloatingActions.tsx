// components/floatLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

export default function FloatingActions({
  facebookUrl,
  instagramUrl,
}: {
  facebookUrl: string;
  instagramUrl: string;
}) {
  const [visible, setVisible] = useState(false);
  const { logAnalyticsEvent, trackSocialClick } = useAnalytics();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    // Track scroll to top action
    logAnalyticsEvent("scroll_to_top", {
      scroll_position: window.scrollY,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    // Track WhatsApp click
    logAnalyticsEvent("whatsapp_click", {
      action: "chat",
    });
  };

  const handleFacebookClick = () => {
    trackSocialClick("facebook");
  };

  const handleInstagramClick = () => {
    trackSocialClick("instagram");
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

      {/* WhatsApp */}
      <a
        href="https://wa.me/254707848528"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 rounded-full bg-[#25D366] text-white
          shadow-lg hover:shadow-xl
          transition-all duration-300 hover:scale-110
          flex items-center justify-center group relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>

        {/* Optional: Add tooltip on hover */}
        <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      {/* Facebook */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleFacebookClick}
        aria-label="Visit Facebook"
        className="w-11 h-11 rounded-full bg-[#1877F2] text-white
          shadow-lg hover:shadow-xl
          transition-all duration-300 hover:scale-110
          flex items-center justify-center group relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>

        <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Facebook
        </span>
      </a>

      {/* Instagram */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleInstagramClick}
        aria-label="Visit Instagram"
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white
          shadow-lg hover:shadow-xl
          transition-all duration-300 hover:scale-110
          flex items-center justify-center group relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>

        <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Instagram
        </span>
      </a>
    </div>
  );
}
