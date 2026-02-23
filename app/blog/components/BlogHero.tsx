"use client";

import { Search } from "lucide-react";

interface BlogHeroProps {
  totalArticles: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function BlogHero({
  totalArticles,
  searchTerm,
  onSearchChange,
}: BlogHeroProps) {
  return (
    <div className="relative md:pt-0 pt-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/blog/blog-hero.jfif')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a50044]/60 via-[#004d98]/65 to-[#004d98]/60" />

      {/* Dotted texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004d98] rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8a0038] rounded-full blur-3xl opacity-20" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Eyebrow / badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#004d98]/50 backdrop-blur-sm border border-[#004d98]/50
                          text-white/95 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <span>Dive into {totalArticles}+ explorations</span>
          </div>

          {/* Main headline */}
          <h1
            className="
              text-[2.75rem] sm:text-6xl lg:text-7xl
              font-extrabold
              text-white
              tracking-tight
              leading-[1.05]
              mb-6
            "
          >
            Unfiltered Insights
          </h1>

          {/* Sub headline */}
          <p
            className="
              max-w-2xl
              mx-auto
              text-base sm:text-lg lg:text-xl
              text-white/95
              leading-relaxed
              tracking-normal
              mb-12
            "
          >
            Raw ideas, creative detours, and stories from people building what
            they believe in.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#a50044] transition-colors" />

              <input
                type="text"
                placeholder="Search articles by title, author, or topic…"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="
                  w-full
                  pl-12 pr-4 py-4
                  rounded-xl
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-white
                  text-sm sm:text-base
                  leading-normal
                  tracking-normal
                  placeholder:text-gray-400
                  border-2 border-transparent
                  focus:border-[#a50044]
                  focus:outline-none
                  transition-all
                  shadow-xl
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
