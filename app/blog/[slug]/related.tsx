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

const RELATED_QUERY = `
*[
  _type == "post"
  && slug.current != $slug
  && count(categories[]->title[@ in $categories]) > 0
]
|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage
}
`;

export default async function RelatedPosts({
  slug,
  categories,
}: {
  slug: string;
  categories: string[];
}) {
  const posts = await client.fetch<SanityDocument[]>(
    RELATED_QUERY,
    { slug, categories },
    { next: { revalidate: 60 } },
  );

  if (!posts?.length) return null;

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
          {posts.map((post) => {
            const imageUrl = post.mainImage
              ? urlFor(post.mainImage).width(900).height(600).url()
              : null;

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:border-pink-500/40"
              >
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

                {/* glow accent */}
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" />
                <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
