"use client";

import { ArrowRight } from "lucide-react";
import AnimatedButton from "./button";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Background images */}
      <div className="absolute inset-0 z-0">
        {/* Light */}
        <div
          className="absolute inset-0 bg-cover bg-center dark:hidden"
          style={{ backgroundImage: "url('/card4.png')" }}
        />

        {/* Dark */}
        <div
          className="absolute inset-0 bg-cover bg-left hidden dark:block"
          style={{ backgroundImage: "url('/fabric-logo-2.png')" }}
        />

        {/* Soft overlay (more readable than mix-blend) */}
        <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/30 to-transparent dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40" />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10
          mx-auto
          max-w-7xl 2xl:max-w-360
          px-4 sm:px-8 lg:px-12 2xl:px-24
          py-16 lg:py-24
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Text */}
          <div className="max-w-xl">
            <AnimatedButton
              color="#a50044"
              ariaLabel="Contact us"
              className="
                px-8 py-4 mb-3
                text-base md:text-lg
                font-semibold
                rounded-sm
                shadow-lg
                hover:shadow-xl
                bg-[#004d98]
              "
              onClick={() => {
                window.location.href = "/contacts";
              }}
            >
              Contact us
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </AnimatedButton>
            <h2
              className="
                font-sans font-extrabold tracking-tight leading-[1.05]
                text-3xl sm:text-4xl xl:text-5xl
                text-gray-900 dark:text-white
              "
            >
              Ready to build something
              <span className="block text-[#004d98] dark:text-[#a50044]">
                meaningful?
              </span>
            </h2>

          </div>

          {/* Action */}
          <div className="flex lg:justify-start">
          </div>
        </div>
      </div>
    </section>
  );
}
