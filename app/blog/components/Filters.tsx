"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Search, SlidersHorizontal, X } from "lucide-react";
import { type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const imageBuilder = createImageUrlBuilder(client);
const imageUrl = (source: SanityImageSource) => imageBuilder.image(source).width(1400).auto("format").url();

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

const dateLabel = (value?: string) => value
  ? new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
  : "Recently published";

export default function FilterablePosts({ initialPosts, categories, authors }: FilterablePostsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const posts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...initialPosts]
      .filter((post) => {
        const matchesCategory = !category || post.categories?.some((item) => item.title === category);
        const matchesAuthor = !author || post.author?.name === author;
        const searchable = [post.title, post.excerpt, post.author?.name, ...(post.categories || []).map((item) => item.title)].filter(Boolean).join(" ").toLowerCase();
        return matchesCategory && matchesAuthor && (!normalizedQuery || searchable.includes(normalizedQuery));
      })
      .sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [initialPosts, query, category, author, sortOrder]);

  const resetFilters = () => { setQuery(""); setCategory(""); setAuthor(""); };

  return (
    <main className="min-h-screen bg-[#f5f4f1] text-[#151515] dark:bg-[#080b12] dark:text-white">
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="sticky top-20 z-20 -mx-5 border-y border-black/[0.07] bg-[#f5f4f1]/95 px-5 py-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#080b12]/95 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search aria-hidden="true" size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search stories"
                aria-label="Search blog posts"
                className="h-11 w-full rounded-xl border border-black/10 bg-white/75 pl-10 pr-4 text-sm outline-none transition-colors duration-150 placeholder:text-neutral-400 focus:border-[#004d98] dark:border-white/10 dark:bg-white/[0.04] dark:focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 lg:justify-end">
              <span className="mr-1 hidden shrink-0 items-center gap-1.5 text-xs text-neutral-500 sm:inline-flex"><SlidersHorizontal size={14} /> Filter</span>
              <button type="button" onClick={() => setCategory("")} aria-pressed={!category} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${!category ? "bg-[#151515] text-white dark:bg-white dark:text-[#111]" : "border border-black/10 text-neutral-600 hover:border-black/25 dark:border-white/10 dark:text-neutral-300 dark:hover:border-white/25"}`}>
                All stories
              </button>
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(category === item ? "" : item)} aria-pressed={category === item} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${category === item ? "bg-[#a50044] text-white" : "border border-black/10 text-neutral-600 hover:border-black/25 dark:border-white/10 dark:text-neutral-300 dark:hover:border-white/25"}`}>
                  {item}
                </button>
              ))}
              {authors.length > 1 && (
                <select aria-label="Filter by author" value={author} onChange={(event) => setAuthor(event.target.value)} className="h-9 shrink-0 rounded-full border border-black/10 bg-white px-3 text-xs text-neutral-600 outline-none focus:border-[#004d98] dark:border-white/10 dark:bg-[#121722] dark:text-neutral-300">
                  <option value="">All authors</option>
                  {authors.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              )}
              <button type="button" onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")} className="shrink-0 rounded-full border border-black/10 px-3.5 py-2 text-xs font-medium text-neutral-600 transition-colors duration-150 hover:border-black/25 dark:border-white/10 dark:text-neutral-300 dark:hover:border-white/25">
                {sortOrder === "newest" ? "Newest first" : "Oldest first"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-7">
          <p aria-live="polite" className="text-sm text-neutral-500 dark:text-neutral-400">{posts.length} {posts.length === 1 ? "story" : "stories"}</p>
          {(query || category || author) && <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#a50044] hover:text-[#004d98] dark:text-pink-300 dark:hover:text-blue-300"><X size={14} /> Clear filters</button>}
        </div>

        {posts.length ? (
          <div className="grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[250px] lg:grid-cols-12 lg:auto-rows-[250px] lg:gap-5">
            {posts.map((post, index) => {
              const featured = index === 0;
              const secondary = index === 1 || index === 2;
              const span = featured ? "sm:col-span-2 sm:row-span-2 lg:col-span-7" : secondary ? "lg:col-span-5" : "lg:col-span-4";
              const categoriesForPost = (post.categories || []).map((item) => item.title).filter(Boolean);

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={`group relative isolate flex min-h-0 flex-col justify-between overflow-hidden rounded-[1.35rem] bg-[#d8d8d5] p-5 text-white ring-1 ring-black/[0.04] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] dark:bg-[#1b202b] dark:ring-white/[0.06] sm:p-6 ${span}`}
                >
                  {post.mainImage ? (
                    <Image src={imageUrl(post.mainImage)} alt="" fill sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"} className="-z-20 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]" />
                  ) : (
                    <div aria-hidden="true" className={`absolute inset-0 -z-20 ${index % 3 === 0 ? "bg-gradient-to-br from-[#004d98] via-[#205485] to-[#a50044]" : index % 3 === 1 ? "bg-gradient-to-br from-[#a50044] via-[#7b3151] to-[#192f4a]" : "bg-gradient-to-br from-[#183e54] via-[#315c70] to-[#a50044]"}`} />
                  )}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/5 to-black/80" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {categoriesForPost.slice(0, 2).map((label) => <span key={label} className="rounded-full border border-white/25 bg-black/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">{label}</span>)}
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-black/15 text-white backdrop-blur-sm transition-colors duration-150 group-hover:bg-white group-hover:text-[#151515]"><ArrowUpRight size={18} /></span>
                  </div>

                  <div className="max-w-2xl">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-white/75">
                      <time dateTime={post.publishedAt}>{dateLabel(post.publishedAt)}</time>
                      {post.readingTime ? <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {post.readingTime} min read</span> : null}
                      {post.author?.name ? <span>{post.author.name}</span> : null}
                    </div>
                    <h2 className={`max-w-2xl font-semibold leading-[1.02] tracking-[-0.025em] text-white ${featured ? "text-3xl sm:text-4xl lg:text-6xl" : "text-2xl sm:text-3xl"}`}>
                      {post.title}
                    </h2>
                    {featured && post.excerpt ? <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-white/80 sm:text-base">{post.excerpt}</p> : null}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid min-h-72 place-items-center rounded-[1.35rem] border border-dashed border-black/15 px-6 text-center dark:border-white/15">
            <div><p className="text-lg font-medium">No stories found</p><p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Try a different search or clear your filters.</p><button type="button" onClick={resetFilters} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#151515] px-4 py-2 text-sm font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97] dark:bg-white dark:text-[#111]">Clear filters <X size={14} /></button></div>
          </div>
        )}
      </section>
    </main>
  );
}
