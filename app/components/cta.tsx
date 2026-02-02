"use client";

import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden md:p-6 bg-white dark:bg-gray-900"
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

      {/* Content - same as before */}
      <div className="relative z-10">
        <div className="flex flex-col items-start justify-between w-full max-w-6xl mx-auto gap-4 py-16 px-4 sm:px-6 lg:py-20 lg:px-12">
          {/* Button */}
          <div className="mb-12 lg:mb-0 lg:mr-12 animate-[slideUp_0.8s_ease-out]">
            <a
              href="/contacts"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-lg shadow-md bg-[#004d98] hover:bg-[#003d7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004d98] transition-all duration-300 group dark:bg-[#a50044] dark:hover:bg-[#8a0038] dark:focus:ring-[#a50044]"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>

          {/* Text */}
          <div className="max-w-2xl animate-[fadeIn_1s_ease-out_0.3s]">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              <span className="block font-sans text-[#004d98] dark:text-[#a50044]">
                Ready to Build Something Great?
              </span>
              <span className="block font-serif text-[#a50044] dark:text-[#004d98] mt-1">
                Let&apos;s discuss how we can help
              </span>
            </h2>

            <p className="mt-4 text-lg md:text-xl font-normal leading-relaxed text-neutral-900 dark:text-neutral-100 animate-[slideUp_1s_ease-out_0.5s]">
              We help organizations establish a strong digital presence, create
              reliable systems, and grow sustainably. Let&apos;s work together
              to make your ideas real.
            </p>
          </div>
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
      `}</style>
    </section>
  );
}
