"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import { type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const imageBuilder = createImageUrlBuilder(client);
const imageUrl = (source: SanityImageSource) => imageBuilder.image(source).width(1600).auto("format").url();

export type BlogPost = SanityDocument & {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  readingTime?: number;
  mainImage?: SanityImageSource;
  author?: { name?: string };
  categories?: { title?: string }[];
};

interface FilterablePostsProps {
  initialPosts: BlogPost[];
  categories: string[];
  authors: string[];
}

const dateLabel = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
    : "Recently published";

/**
 * Bento pattern, repeats every 8 posts on a 12-column grid:
 *  [ 6x2 feature ][ 3 ][ 3 ]
 *  [ 6x2 feature ][ 3 ][ 3 ]
 *  [ 4 ][ 4 ][ 4 ]
 */
const SPANS = [
  "sm:col-span-2 lg:col-span-6 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "sm:col-span-2 lg:col-span-4",
];

const PLACEHOLDERS = ["bg-[#004d98]", "bg-[#a50044]", "bg-[#183e54]"];

const chip =
  "shrink-0 rounded-sm px-3 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004d98]";
const chipIdle =
  "border border-black/15 text-neutral-700 hover:border-black/40 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/40";

export default function FilterablePosts({ initialPosts, categories, authors }: FilterablePostsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...initialPosts]
      .filter((post) => {
        const okCategory = !category || post.categories?.some((c) => c.title === category);
        const okAuthor = !author || post.author?.name === author;
        const text = [post.title, post.excerpt, post.author?.name, ...(post.categories || []).map((c) => c.title)]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return okCategory && okAuthor && (!q || text.includes(q));
      })
      .sort((a, b) => {
        const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return sortOrder === "newest" ? db - da : da - db;
      });
  }, [initialPosts, query, category, author, sortOrder]);

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setAuthor("");
  };

  return (
    <main className="min-h-screen w-full bg-[#f5f4f1] text-[#151515] dark:bg-[#080b12] dark:text-white">
      {/* Toolbar */}
      <div className="sticky top-20 z-20 w-full border-y border-black/10 bg-[#f5f4f1]/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#080b12]/95">
        <div className="flex w-full flex-col gap-3 px-4 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between 2xl:px-16">
          <div className="relative w-full lg:max-w-md">
            <Search aria-hidden="true" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories"
              aria-label="Search blog posts"
              className="h-10 w-full rounded-sm border border-black/15 bg-white pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-[#004d98] dark:border-white/15 dark:bg-white/5 dark:focus:border-blue-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <button
              type="button"
              onClick={() => setCategory("")}
              aria-pressed={!category}
              className={`${chip} ${!category ? "bg-[#151515] text-white dark:bg-white dark:text-[#151515]" : chipIdle}`}
            >
              All stories
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(category === item ? "" : item)}
                aria-pressed={category === item}
                className={`${chip} ${category === item ? "bg-[#a50044] text-white" : chipIdle}`}
              >
                {item}
              </button>
            ))}
            {authors.length > 1 && (
              <select
                aria-label="Filter by author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="h-9 shrink-0 rounded-sm border border-black/15 bg-white px-3 text-xs text-neutral-700 outline-none focus:border-[#004d98] dark:border-white/15 dark:bg-[#121722] dark:text-neutral-300"
              >
                <option value="">All authors</option>
                {authors.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className={`${chip} ${chipIdle}`}
            >
              {sortOrder === "newest" ? "Newest first" : "Oldest first"}
            </button>
          </div>
        </div>
      </div>

      <section className="w-full px-4 pb-24 sm:px-8 2xl:px-16">
        <div className="flex items-center justify-between py-6">
          <p aria-live="polite" className="text-sm text-neutral-600 dark:text-neutral-400">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
          </p>
          {(query || category || author) && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-[#a50044] hover:underline dark:text-pink-300"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>

        {posts.length ? (
          <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[clamp(17rem,19vw,28rem)] lg:gap-4 2xl:gap-5">
            {posts.map((post, index) => {
              const featured = index % SPANS.length === 0;
              const span = SPANS[index % SPANS.length];
              const labels = (post.categories || []).map((c) => c.title).filter(Boolean) as string[];

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={`group flex min-h-0 flex-col overflow-hidden rounded-sm border border-black/10 bg-white transition-colors duration-150 hover:border-[#a50044] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004d98] dark:border-white/10 dark:bg-[#0f1420] dark:hover:border-pink-400 ${span}`}
                >
                  {/* Image: kept separate from text so titles never sit on a photo */}
                  <div className={`relative min-h-0 w-full overflow-hidden bg-neutral-200 dark:bg-[#1b202b] ${featured ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[16/10]"} lg:aspect-auto lg:flex-1`}>
                    {post.mainImage ? (
                      <Image
                        src={imageUrl(post.mainImage)}
                        alt=""
                        fill
                        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div aria-hidden="true" className={`absolute inset-0 ${PLACEHOLDERS[index % PLACEHOLDERS.length]}`} />
                    )}
                    {labels[0] && (
                      <span className="absolute left-3 top-3 rounded-sm bg-white px-2 py-1 text-xs font-semibold text-[#151515]">
                        {labels[0]}
                      </span>
                    )}
                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-sm bg-white text-[#151515] transition-colors group-hover:bg-[#a50044] group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Text panel: solid surface, full contrast */}
                  <div className={`shrink-0 p-4 ${featured ? "lg:p-6 2xl:p-8" : "2xl:p-5"}`}>
                    <h2
                      className={`font-semibold tracking-tight text-[#151515] dark:text-white ${
                        featured
                          ? "line-clamp-3 text-2xl leading-[1.1] lg:text-3xl 2xl:text-5xl"
                          : "line-clamp-2 text-lg leading-snug 2xl:text-2xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                    {featured && post.excerpt && (
                      <p className="mt-3 line-clamp-2 max-w-2xl text-base leading-7 text-neutral-700 dark:text-neutral-300 2xl:text-lg">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400 2xl:text-sm">
                      <time dateTime={post.publishedAt}>{dateLabel(post.publishedAt)}</time>
                      {post.readingTime ? (
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={12} /> {post.readingTime} min read
                        </span>
                      ) : null}
                      {post.author?.name ? <span>By {post.author.name}</span> : null}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid min-h-72 place-items-center rounded-sm border border-dashed border-black/20 px-6 text-center dark:border-white/20">
            <div>
              <p className="text-lg font-medium">No stories match your search</p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Try different keywords or clear your filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-[#151515] px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-[#151515]"
              >
                Clear filters <X size={14} />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}