/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/components/FilterablePosts.tsx (Client Component)
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M3 6L8 11L13 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterSection({
  label,
  accentColor,
  children,
  defaultOpen = false,
}: {
  label: string;
  accentColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between"
      >
        <h3 style={{ color: accentColor }}>{label}</h3>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

interface FilterablePostsProps {
  initialPosts: SanityDocument[];
  categories: string[];
  authors: string[];
}

export default function FilterablePosts({
  initialPosts,
  categories,
  authors,
}: FilterablePostsProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author],
    );
  };

  const filteredSortedPosts = useMemo(() => {
    let filtered = [...initialPosts];

    // Filter by categories (OR logic)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        post.categories?.some((cat: any) =>
          selectedCategories.includes(cat.title),
        ),
      );
    }

    // Filter by authors (OR logic)
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((post) =>
        selectedAuthors.includes(post.author?.name),
      );
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [initialPosts, selectedCategories, selectedAuthors, sortOrder]);

  return (
    <main className="min-h-screen bg-[#e3e4ee] text-gray-900 dark:bg-[#050816] dark:text-white">
      <section className="mx-auto p-1 md:px-6 md:py-14">
        {/* Filters Section */}
        <div className="mb-2 grid gap-6 rounded-sm  p-6 md:grid-cols-3">
          <FilterSection label="Categories" accentColor="#a50044">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`rounded-sm border px-4 py-2 text-xs transition-colors ${
                  selectedCategories.includes(category)
                    ? "bg-[#a50044] text-white border-[#a50044]"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </FilterSection>

          <FilterSection label="Authors" accentColor="#004d98">
            {authors.map((author) => (
              <button
                key={author}
                onClick={() => toggleAuthor(author)}
                className={`rounded-sm border px-4 py-2 text-xs transition-colors ${
                  selectedAuthors.includes(author)
                    ? "bg-[#004d98] text-white border-[#004d98]"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {author}
              </button>
            ))}
          </FilterSection>

          {/* Sort Control */}
          <div className="flex items-center md:flex-row flex-col gap-3">
            <h3 style={{ color: "#004d98" }}>Sort by Date</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder("newest")}
                className={`rounded-sm border px-4 py-2 text-xs transition-colors ${
                  sortOrder === "newest"
                    ? "bg-[#a50044] text-white border-[#a50044]"
                    : "hover:bg-[#004d98]/10 dark:hover:bg-gray-800"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`rounded-sm border px-4 py-2 text-xs transition-colors ${
                  sortOrder === "oldest"
                    ? "bg-[#a50044] text-white border-[#a50044]"
                    : "hover:bg-[#004d98]/10 dark:hover:bg-gray-800"
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        {filteredSortedPosts.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No posts found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid auto-rows-[260px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredSortedPosts.map((post, index) => {
              const large = index === 0 || index === 4 || index === 7;

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={`group relative overflow-hidden rounded-sm
                  ${large ? "md:col-span-2 md:row-span-2" : ""}`}
                >
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(1200).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  {/* Premium overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-all duration-500 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
                    {/* Title */}
                    <h3 className="max-w-3xl text-2xl font-black leading-[1.05] tracking-tight text-white transition-all duration-500 group-hover:text-[#dca1b8] md:text-3xl ">
                      {post.title}
                    </h3>

                    {/* Meta */}
                    <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>

                      {post.author?.name && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-white/40" />
                          <span>{post.author.name}</span>
                        </>
                      )}
                    </div>

                    {/* Accent line */}
                    <div className="mt-4 h-[2px] w-14 bg-[#a50044] transition-all duration-500 group-hover:w-24" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
