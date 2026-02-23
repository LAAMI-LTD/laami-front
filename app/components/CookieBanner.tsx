"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("cookie-consent");
  });

  // 🔔 Signal when banner visibility changes
  useEffect(() => {
    if (visible) {
      document.body.classList.add("cookie-visible");
      window.dispatchEvent(new Event("cookie-banner-visible"));
    } else {
      document.body.classList.remove("cookie-visible");
      window.dispatchEvent(new Event("cookie-banner-hidden"));
    }
  }, [visible]);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");

    window.dispatchEvent(new Event("cookie-consent-granted"));

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies and privacy-friendly analytics to improve your
          experience. We do not sell your data and do not collect personally
          identifiable information. By continuing to browse, you agree to our{" "}
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/cookie-policy" className="underline hover:text-white">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-service" className="underline hover:text-white">
            Terms of Service
          </Link>
          .
        </p>

        <button
          onClick={acceptCookies}
          className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
