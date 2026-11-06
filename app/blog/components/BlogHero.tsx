import Link from "next/link";
import { ArrowDownRight, Rss } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#f5f4f1] px-5 pb-12 pt-32 text-[#151515] dark:bg-[#080b12] dark:text-white sm:px-8 sm:pb-16 sm:pt-36 lg:px-12 lg:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#a50044]/[0.06] blur-3xl dark:bg-[#a50044]/[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#004d98] dark:text-blue-300">
          <span className="h-px w-8 bg-[#a50044]" />
          LAAMI LABS JOURNAL
        </div>

        <div className="grid items-end gap-8 lg:grid-cols-[1fr_22rem]">
          <div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              Ideas for what&apos;s <span className="text-[#a50044]">next.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg">
              Fresh thinking on technology, design, and the work of building something that matters.
            </p>
          </div>

          <div className="flex items-end justify-between border-t border-black/10 pt-5 dark:border-white/10 lg:justify-end lg:gap-10 lg:border-0 lg:pt-0">
            <div>
              <span className="block text-3xl font-semibold tracking-tight">01</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-neutral-500">Ideas in motion</span>
            </div>
            <Link href="/blog/feed.xml" aria-label="Subscribe to the blog RSS feed" className="group inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-out hover:border-[#a50044] hover:text-[#a50044] active:scale-[0.97] dark:border-white/15 dark:hover:border-pink-400 dark:hover:text-pink-300">
              <Rss size={15} /> RSS feed <ArrowDownRight size={15} className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
