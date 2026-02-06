"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Fixed Navigation Buttons */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "top-6 opacity-100" : "-top-20 opacity-0"
        }`}
      >
        <div className="flex gap-4 w-screen px-4 sm:px-6 lg:px-8 justify-center sm:justify-start ">
          <div className="max-w-6xl w-full mx-auto flex justify-end">
            <div className="flex gap-4 animate-[fadeIn_1s_ease-out_0.1s]">
              <Link
                href="/portfolio"
                className="px-5 py-3 rounded-lg bg-[#a50044] text-white font-semibold hover:bg-[#750033] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#a50044] focus:ring-offset-2"
                aria-label="Navigate to Company Portfolio page"
              >
                Company Portfolio
              </Link>
              <Link
                href="/"
                className="px-5 py-3 rounded-lg bg-[#004d98] text-white font-semibold hover:bg-[#003366] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#004d98] focus:ring-offset-2"
                aria-label="Navigate to Home page"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section
        id="contact"
        className="relative overflow-hidden bg-white dark:bg-neutral-900"
      >
        {/* Background images for both themes */}
        <div className="absolute inset-0 z-0">
          {/* Light mode image */}
          <div
            className="absolute inset-0 bg-cover bg-center dark:hidden"
            style={{
              backgroundImage: "url('/card4.png')",
            }}
          />
          {/* Dark mode image */}
          <div
            className="absolute inset-0 bg-cover bg-left hidden dark:block"
            style={{
              backgroundImage: "url('/card5.png')",
            }}
          />

          {/* Gradient overlay with mix-blend */}
          {/* <div
            className="absolute inset-0 bg-linear-to-r from-[#004d98] via-[#004d98]/90 to-[#004d98] dark:from-transparent dark:via-transparent dark:to-transparent"
            // style={{ mixBlendMode: "overlay" }}
          /> */}
          {/* Soft overlay (more readable than mix-blend) */}
          <div
            className="absolute inset-0 bg-linear-to-r from-white/80 via-white/30 to-transparent dark:from-neutral-900/95 dark:via-neutral-900/60 dark:to-neutral-900/40 md:dark:to-transparent"
            // style={{ mixBlendMode: "overlay" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 py-2 m-4 pt-30">
          {" "}
          <div className="max-w-2xl animate-[fadeIn_1s_ease-out_0.3s]">
            <h2 className="font-sans font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl xl:text-5xl text-gray-900 dark:text-white">
              Ready to build something
              <span className="block text-[#004d98] dark:text-[#a50044]">
                truly meaningful?
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base sm:text-lg xl:text-xl leading-relaxed text-gray-700 dark:text-neutral-200 animate-[slideUp_1s_ease-out_0.5s]">
              We help organizations establish a strong digital presence, build
              reliable systems, and grow sustainably. Let’s work together to
              turn your ideas into products, platforms and brands that last.
            </p>
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .fixed-nav-container {
              padding: 0 1rem;
            }
          }
        `}</style>
      </section>
    </>
  );
}
