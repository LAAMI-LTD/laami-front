"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { professionalProjects } from "./tabs/software/projects/projects";

type TabId = "software" | "marketing" | "company";

interface HeroShowcaseProps {
  activeTab: TabId;
}

const disciplines: Record<TabId, { title: string; subtitle: string }> = {
  software: { title: "Digital products, made useful.", subtitle: "Software and web experiences designed around the people who use them." },
  marketing: { title: "Brands with a point of view.", subtitle: "Identity, content, and campaigns that help good work get noticed." },
  company: { title: "A stronger start for business.", subtitle: "Practical company setup and support for ideas ready to grow." },
};

export default function HeroShowcase({ activeTab }: HeroShowcaseProps) {
  const content = disciplines[activeTab];

  return (
    <section className="relative isolate overflow-hidden bg-[#0b101a] text-white">
      <div className="absolute inset-0 -z-20">
        <Image src="/work.avif" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-40" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080b12] via-[#080b12]/90 to-[#080b12]/45" />
      <div aria-hidden="true" className="absolute -right-20 top-0 -z-10 h-96 w-96 rounded-full bg-[#a50044]/20 blur-3xl" />

      <div className="mx-auto grid min-h-[28rem] max-w-7xl items-end gap-12 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65"><span className="h-px w-8 bg-[#d84f86]" />LAAMI LTD / SELECTED WORK</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">{content.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">{content.subtitle}</p>
          <button type="button" onClick={() => {
            const target = document.getElementById(activeTab === "software" ? "portfolio-projects" : "portfolio-content");
            target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors duration-150 hover:bg-[#f2d8e2] active:scale-[0.97]">
            {activeTab === "software" ? "Browse selected projects" : "Explore this discipline"} <ArrowDown size={16} />
          </button>
        </div>

        <div className="flex items-end justify-between gap-10 border-t border-white/15 pt-5 lg:min-w-64 lg:border-l lg:border-t-0 lg:pb-1 lg:pl-8 lg:pt-0">
          <div><span className="block text-4xl font-semibold tracking-tight">{String(professionalProjects.length).padStart(2, "0")}</span><span className="mt-1 block text-xs uppercase tracking-[0.15em] text-white/55">Featured projects</span></div>
          <a href="/contacts" className="inline-flex items-center gap-1 text-sm font-medium text-white/75 transition-colors duration-150 hover:text-white">Start a project <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}
