import Link from "next/link";
import { Rss } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="w-full bg-[#f5f4f1] px-4 pb-10 pt-32 text-[#151515] dark:bg-[#080b12] dark:text-white sm:px-8 sm:pb-14 sm:pt-36 lg:pt-40 2xl:px-16">
      <div className="grid w-full items-end gap-6 lg:grid-cols-[1fr_minmax(20rem,32rem)] lg:gap-16">
        <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl 2xl:text-9xl">
          Ideas for what&apos;s next.
        </h1>

        <div className="flex flex-col gap-5 border-t border-black/15 pt-5 dark:border-white/15 lg:border-0 lg:pt-0">
          <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300 sm:text-lg 2xl:text-xl 2xl:leading-8">
            Practical guides and stories on technology, design, and building businesses in Kenya and across Africa.
          </p>
          <Link
            href="/blog/feed.xml"
            aria-label="Subscribe to the blog RSS feed"
            className="inline-flex w-fit items-center gap-2 rounded-sm border border-black/20 px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:border-[#a50044] hover:text-[#a50044] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004d98] dark:border-white/20 dark:hover:border-pink-400 dark:hover:text-pink-300"
          >
            <Rss size={15} /> Subscribe via RSS
          </Link>
        </div>
      </div>
    </section>
  );
}