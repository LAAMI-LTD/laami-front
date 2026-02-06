"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type TabId = "software" | "marketing" | "company";

interface HeroShowcaseProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function HeroShowcase({
  activeTab,
  onTabChange,
}: HeroShowcaseProps) {
  const tabs = [
    { id: "software", label: "Software Development", short: "Software" },
    {
      id: "marketing",
      label: "Marketing",
      short: "Marketing",
    },
    { id: "company", label: "Company Setup", short: "Company" },
  ] as const;

  const colors = ["#a50044", "#004d98", "#8a0038", "#003d7a"];

  const activeTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const activeTabColor = colors[activeTabIndex % colors.length];
  const activeTabLabel = tabs[activeTabIndex]?.label ?? "";

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/work.avif" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-20 py-20 lg:py-28">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-light leading-tight">
            Explore our work on <br />
            <span style={{ color: activeTabColor }}>{activeTabLabel}</span>
          </h1>

          <div className="mt-10">
            <Link
              href="#"
              className="relative overflow-hidden border border-gray-700 px-8 py-4 rounded-lg font-medium text-base md:text-lg text-gray-300 group inline-flex items-center justify-center transition-all duration-500 hover:border-[#004d98]"
            >
              <span className="absolute inset-0 scale-x-0 origin-left bg-[#004d98] transition-transform duration-500 group-hover:scale-x-100 z-0" />
              <span className="relative z-10 group-hover:text-white">
                View Our Success Stories
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* ===== STICKY TABS BELOW NAVBAR ===== */}
      <div
        className="
    sticky top-[var(--navbar-height)]
    z-30
    border-b border-black/10
    bg-white/90 backdrop-blur-md
  "
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          {/* Scroll hint (mobile only) */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/90 to-transparent lg:hidden flex items-center justify-end pr-2">
            <ChevronRight className="w-5 h-5 text-black/50 animate-pulse" />
          </div>

          <div
            className="
        flex gap-3 py-4
        overflow-x-auto scrollbar-hide
        lg:justify-center lg:flex-wrap lg:overflow-visible
      "
          >
            {tabs.map((tab, index) => {
              const isActive = tab.id === activeTab;
              const color = colors[index % colors.length];

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="
              group relative shrink-0 overflow-hidden
              px-5 py-3 lg:px-6 lg:py-3
              rounded-lg border
              text-sm font-medium
              transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20
            "
                  style={{
                    borderColor: isActive ? color : `${color}55`,
                    backgroundColor: isActive ? color : "rgba(255,255,255,0.6)",
                    boxShadow: isActive ? `0 8px 30px ${color}40` : "none",
                  }}
                >
                  {/* Swipe / fill animation */}
                  {!isActive && (
                    <span
                      className="
                  absolute inset-0
                  scale-x-0 origin-left
                  transition-transform duration-500 ease-out
                  group-hover:scale-x-100
                "
                      style={{ backgroundColor: color }}
                    />
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white" />
                  )}

                  {/* Label */}
                  <span
                    className="relative z-10 whitespace-nowrap transition-colors duration-300"
                    style={{ color: isActive ? "#fff" : "#111" }}
                  >
                    <span className="lg:hidden">{tab.short}</span>
                    <span className="hidden lg:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-radial-fade z-5" />
    </section>
  );
}
