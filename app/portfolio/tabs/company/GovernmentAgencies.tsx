// components/tab-content/company/GovernmentAgencies.tsx

import Image from "next/image";
import { GovernmentAgency } from "./types";

interface GovernmentAgenciesProps {
  governmentAgencies: GovernmentAgency[];
}

export default function GovernmentAgencies({
  governmentAgencies,
}: GovernmentAgenciesProps) {
  return (
    <div className="antialiased px-4 sm:px-6 lg:px-20">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 text-center">
        We Navigate Government Requirements So You Don&apos;t Have To
      </h3>

      <p className="text-sm sm:text-base md:text-[15px] text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-6 text-center">
        Dealing with multiple agencies can be overwhelming. We handle the
        interactions with:
      </p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {governmentAgencies.map((agency, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center text-center
              w-[45%] sm:w-[30%] md:w-[22%]
              bg-white dark:bg-gray-800/40
              border border-gray-200/80 dark:border-white/10
              rounded-2xl
              px-4 pt-6 pb-5
              backdrop-blur-sm
              hover:-translate-y-1 hover:shadow-md
              transition-all duration-300
            "
          >
            {/* Logo */}
            <div className="relative w-20 h-16 mb-4 flex items-center justify-center bg-white dark:bg-gray-900 rounded-md ring-1 ring-gray-200/70 dark:ring-white/10">
              <Image
                src={agency.logo}
                alt={`${agency.name} logo`}
                fill
                className="
    object-contain p-2
    transition-all duration-300
    dark:invert dark:brightness-110 dark:contrast-125
  "
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>

            {/* Name */}
            <div className="text-sm sm:text-[14px] font-semibold text-gray-900 dark:text-white leading-5">
              {agency.name}
            </div>

            {/* Divider */}
            <div className="mt-2 mb-2 h-px w-10 bg-gray-200 dark:bg-white/10" />

            {/* Description */}
            <p className="text-[12px] sm:text-[13px] text-gray-600 dark:text-gray-400 leading-5">
              {agency.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
