/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Query for posts that share at least one category (same category priority)
const RELATED_QUERY = `
*[
  _type == "post"
  && slug.current != $slug
  && count(categories[]->title[@ in $categories]) > 0
]
|order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  "categories": categories[]->title
}
`;

// Query for latest posts (for filling gaps)
const LATEST_QUERY = `
*[
  _type == "post"
  && slug.current != $slug
]
|order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  "categories": categories[]->title
}
`;

export default async function RelatedPosts({
  slug,
  categories,
}: {
  slug: string;
  categories: string[];
}) {
  // Fetch all related posts (any category match)
  const relatedPosts = await client.fetch<SanityDocument[]>(
    RELATED_QUERY,
    { slug, categories },
    { next: { revalidate: 60 } },
  );

  // Separate posts by category match priority
  const sameCategoryPosts: SanityDocument[] = [];
  const differentCategoryPosts: SanityDocument[] = [];

  // Count how many categories each post shares with the current post
  for (const post of relatedPosts) {
    const postCategories = post.categories || [];
    const sharedCategories = postCategories.filter((cat: string) =>
      categories.includes(cat),
    );

    if (sharedCategories.length > 0) {
      // Posts that share at least one category
      sameCategoryPosts.push(post);
    } else {
      // This shouldn't happen due to query, but just in case
      differentCategoryPosts.push(post);
    }
  }

  // Start with posts that share categories (already ordered by date)
  let finalPosts = [...sameCategoryPosts];

  // If we have fewer than 3 posts total, fetch latest posts to fill
  if (finalPosts.length < 3) {
    const latestPosts = await client.fetch<SanityDocument[]>(
      LATEST_QUERY,
      { slug },
      { next: { revalidate: 60 } },
    );

    // Filter out posts already in finalPosts
    const existingIds = new Set(finalPosts.map((post) => post._id));
    const filteredLatest = latestPosts.filter(
      (post) => !existingIds.has(post._id),
    );

    // Calculate how many more we need
    const needed = 3 - finalPosts.length;

    // Add latest posts (these are truly unrelated)
    const fillPosts = filteredLatest.slice(0, needed);
    finalPosts = [...finalPosts, ...fillPosts];
  }

  // If we still have more than 3, trim to 3 (keeping the category-matched ones first)
  if (finalPosts.length > 3) {
    finalPosts = finalPosts.slice(0, 3);
  }

  if (!finalPosts?.length) return null;

  return (
    <section className="relative border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            Related Stories
          </h2>
          <p className="mt-2 text-sm text-white/60">
            More insights curated from similar themes and categories
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {finalPosts.map((post, index) => {
            const imageUrl = post.mainImage
              ? urlFor(post.mainImage).width(900).height(600).url()
              : null;

            // Check if this post shares categories with current post
            const postCategories = post.categories || [];
            const sharesCategories = postCategories.some((cat: string) =>
              categories.includes(cat),
            );

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:border-pink-500/40"
              >
                {/* Priority indicator - subtle badge for same-category posts */}
                {sharesCategories && (
                  <div className="absolute top-3 right-3 z-10 rounded-full bg-pink-500/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    Related
                  </div>
                )}

                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  )}

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold leading-snug transition group-hover:text-pink-300">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-3 text-sm leading-6 text-white/60">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between text-xs text-white/50">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>

                    <span className="text-pink-400 group-hover:text-pink-300">
                      Read →
                    </span>
                  </div>
                </div>

                {/* glow accent - more prominent for related posts */}
                <div
                  className={`absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl transition-opacity ${
                    sharesCategories
                      ? "bg-pink-500/30 opacity-100"
                      : "bg-pink-500/10 opacity-50"
                  }`}
                />
                <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
