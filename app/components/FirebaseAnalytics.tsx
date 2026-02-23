"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { analyticsPromise } from "../firebase";

export default function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    let active = true;

    async function trackPage() {
      const consent = localStorage.getItem("cookie-consent");
      if (consent !== "accepted") return;

      // Delay slightly to ensure document.title is ready
      await new Promise((res) => setTimeout(res, 0));

      const analytics = await analyticsPromise;
      if (!analytics || !active) return;

      logEvent(analytics, "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });

      console.log("Analytics tracked:", pathname);
    }

    trackPage();

    // Listen for consent granted while user is on page
    const handleConsent = () => {
      trackPage();
    };

    window.addEventListener("cookie-consent-granted", handleConsent);

    return () => {
      active = false;
      window.removeEventListener("cookie-consent-granted", handleConsent);
    };
  }, [pathname]);

  return null;
}
