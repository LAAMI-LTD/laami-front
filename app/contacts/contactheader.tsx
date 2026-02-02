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
      <div className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "top-6 opacity-100" : "-top-20 opacity-0"
      }`}>
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
        className="relative overflow-hidden bg-white dark:bg-gray-900"
      >
        {/* Background images for both themes */}
        <div className="absolute inset-0 z-0">
          {/* Light mode image */}
          <div
            className="absolute inset-0 bg-cover bg-center dark:hidden"
            style={{
              backgroundImage: "url('/card1.png')",
            }}
          />
          {/* Dark mode image */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden dark:block"
            style={{
              backgroundImage: "url('/card2.png')",
            }}
          />
          
          {/* Gradient overlay with mix-blend */}
          <div
            className="absolute inset-0 bg-linear-to-r from-[#004d98] via-[#004d98]/90 to-[#004d98] dark:from-transparent dark:via-transparent dark:to-transparent"
            style={{ mixBlendMode: "overlay" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 py-2 "> {/* Increased top padding for fixed nav */}
          <div className="flex flex-col items-start justify-between w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-12">
            {/* Text Content - Removed duplicate nav buttons here */}
            <div className="max-w-xl pt-2 animate-[fadeIn_1s_ease-out_0.3s]">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                <p className="block font-sans text-[#004d98] dark:text-[#a50044]">
                  Ready to Build Something Great?
                </p>
                <p className="block font-serif text-[#a50044] dark:text-[#004d98] mt-1">
                  Let&apos;s discuss how we can help
                </p>
              </h2>

              <p className="mt-4 text-lg md:text-xl font-normal leading-relaxed text-[#001326] dark:text-neutral-100 animate-[slideUp_1s_ease-out_0.5s]">
                We help organizations establish a strong digital presence, create reliable systems,
                and grow sustainably. Let&apos;s work together to make your ideas real.
              </p>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
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