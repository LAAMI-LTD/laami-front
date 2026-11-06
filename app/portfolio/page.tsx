"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Share2 } from "lucide-react";
import HeroShowcase from "./wokhero";
import TabContentWrapper from "./tabs/TabContentWrapper";
import Footer from "../components/footer";

export type TabId = "software" | "marketing" | "company";

const TABS: TabId[] = ["software", "marketing", "company"];
const TAB_LABELS: Record<TabId, string> = {
  software: "Software development",
  marketing: "Marketing & design",
  company: "Company setup",
};

const readTab = (): TabId => {
  if (typeof window === "undefined") return "software";
  const hash = window.location.hash.slice(1) as TabId;
  return TABS.includes(hash) ? hash : "software";
};

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<TabId>("software");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const syncTab = () => setActiveTab(readTab());
    syncTab();
    window.addEventListener("hashchange", syncTab);
    window.addEventListener("popstate", syncTab);
    return () => {
      window.removeEventListener("hashchange", syncTab);
      window.removeEventListener("popstate", syncTab);
    };
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `#${tab}`);
  }, []);

  const sharePortfolio = async () => {
    const url = `${window.location.origin}/portfolio#${activeTab}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "LAAMI LTD Portfolio", text: `Explore our ${TAB_LABELS[activeTab].toLowerCase()} work.`, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this portfolio link", url);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-neutral-950 dark:bg-[#080b12] dark:text-white">
      <HeroShowcase activeTab={activeTab} />

      <div className="sticky top-16 z-30 border-b border-black/[0.07] bg-[#f7f7f5]/95 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#080b12]/95 md:top-20">
        <div role="tablist" aria-label="Portfolio disciplines" className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-8 lg:px-12">
          {TABS.map((tab) => {
            const selected = activeTab === tab;
            return (
              <button key={tab} id={`portfolio-tab-${tab}`} type="button" role="tab" aria-selected={selected} aria-controls="portfolio-content" tabIndex={selected ? 0 : -1} onClick={() => handleTabChange(tab)} onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const direction = event.key === "ArrowRight" ? 1 : -1;
                const nextIndex = (TABS.indexOf(tab) + direction + TABS.length) % TABS.length;
                handleTabChange(TABS[nextIndex]);
                document.getElementById(`portfolio-tab-${TABS[nextIndex]}`)?.focus();
              }} className={`relative shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 active:scale-[0.98] ${selected ? "bg-white text-neutral-950 shadow-sm ring-1 ring-black/[0.06] dark:bg-white/10 dark:text-white dark:ring-white/10" : "text-neutral-500 hover:bg-black/[0.035] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.04] dark:hover:text-white"}`}>
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </div>
      </div>

      <div id="portfolio-content" role="tabpanel" aria-labelledby={`portfolio-tab-${activeTab}`} tabIndex={0} className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <TabContentWrapper activeTab={activeTab} />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-5 dark:border-white/10 dark:bg-white/[0.035] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div><h2 className="text-base font-semibold">Know someone who should see this?</h2><p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Share the {TAB_LABELS[activeTab].toLowerCase()} portfolio.</p></div>
          <button type="button" onClick={sharePortfolio} className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition-transform duration-150 ease-out hover:bg-[#004d98] active:scale-[0.97] dark:bg-white dark:text-neutral-950 dark:hover:bg-blue-200 sm:self-auto">
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? "Link copied" : "Share portfolio"}
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
