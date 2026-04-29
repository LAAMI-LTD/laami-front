/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { Roboto } from "next/font/google";

import { client } from "@/sanity/client";
import RelatedPosts from "./related";
import Footer from "@/app/components/footer";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  publishedAt,
  readingTime,
  body,
  mainImage,
  slug,
  author->{
    name,
    image,
    bio
  },
  categories[]->{
    title
  }
}`;

const { projectId, dataset } = client.config();

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options,
  );

  // 🛑 SAFE GUARD (fix crash)
  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#e3e4ee] text-gray-900 dark:bg-[#050816] dark:text-white">
        Post not found
      </main>
    );
  }

  const safeSlug = post.slug?.current ?? slug;

  const heroImage = post.mainImage
    ? urlFor(post.mainImage)?.width(2400).height(1400).url()
    : null;

  const authorImage = post.author?.image
    ? urlFor(post.author.image)?.width(120).height(120).url()
    : null;

  const categories = post.categories?.map((c: any) => c.title) || [];

  return (
    <>
      <main className="min-h-screen bg-white text-gray-900 dark:bg-[#050816] dark:text-white">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden border-b border-gray-200 pt-10 dark:border-white/10">
          {/* IMAGE LAYER */}
          <div className="absolute inset-0">
            {heroImage && (
              <Image
                src={heroImage}
                alt={post.title}
                fill
                priority
                className="scale-105 object-cover brightness-110 contrast-110 saturate-110"
              />
            )}

            {/* GRADIENT STACK - Light mode */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#004d98]/20 via-[#004d98]/70 to-[#004d98]/90" />

            {/* Decorative radial gradients using logo colors */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(165,0,68,0.15),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(0,77,152,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.25),transparent_60%)]" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 mx-auto flex min-h-[75vh] w-full max-w-7xl flex-col justify-end px-5 py-14 sm:px-8 md:px-12 lg:px-16">
            <Link
              href="/blog"
              className="mt-10 mb-1 inline-flex w-fit items-center gap-2 rounded-md bg-[#004d98]/60 px-5 py-2 text-sm text-white backdrop-blur-md transition hover:border-[#a50044]/40 hover:bg-[#a50044]/10 "
            >
              ← Back to posts
            </Link>

            {/* Categories */}
            <div className="mb-6 flex flex-wrap gap-3">
              {categories.map((cat: string) => (
                <span
                  key={cat}
                  className="rounded-md border border-[#a50044]/20 bg-[#a50044]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] dark:bg-[#004d98] backdrop-blur-md text-white"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="max-w-5xl text-2xl font-black leading-[1.05] tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-6 max-w-5xl text-base leading-8 text-white sm:text-lg md:text-xl">
                {post.excerpt}
              </p>
            )}

            {/* META */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-gray-200 pt-6 text-sm text-gray-600 dark:border-white/10 dark:text-blue-100/70">
              <span className="text-white">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-gray-400 sm:block dark:bg-white/40 text-white" />

              <span className="text-white">
                {post.readingTime || 5} min read
              </span>

              {post.author?.name && (
                <>
                  <span className="hidden h-1 w-1 rounded-full bg-gray-400 sm:block dark:bg-white/40" />

                  <div className="flex items-center gap-3 text-white">
                    {authorImage && (
                      <Image
                        src={authorImage}
                        alt={post.author.name}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full border border-gray-300 object-cover dark:border-white/10"
                      />
                    )}
                    <span>{post.author.name}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ================= ARTICLE ================= */}
        <section className="relative">
          <div className="mx-auto w-full px-4 py-12 sm:px-6 md:px-10 lg:px-14 xl:px-20">
            <article className="mx-auto w-full max-w-6xl">
              <div
                className={`
                  ${roboto.className}

                  prose
                  prose-base sm:prose-lg lg:prose-xl
                  dark:prose-invert

                  prose-p:text-gray-700
                  prose-p:leading-[1.95]
                  dark:prose-p:text-white/85

                  prose-headings:font-black
                  prose-headings:text-gray-900
                  dark:prose-headings:text-white

                  prose-h2:mt-20
                  prose-h2:text-3xl lg:prose-h2:text-4xl

                  prose-h3:mt-14
                  prose-h3:text-2xl

                  prose-a:text-[#a50044]
                  hover:prose-a:text-[#b43968]
                  dark:prose-a:text-pink-300
                  dark:hover:prose-a:text-pink-200

                  prose-blockquote:rounded-2xl
                  prose-blockquote:border-l-4
                  prose-blockquote:border-[#a50044]
                  prose-blockquote:bg-gray-100
                  prose-blockquote:px-8
                  prose-blockquote:py-6
                  dark:prose-blockquote:border-pink-500
                  dark:prose-blockquote:bg-white/5

                  prose-code:bg-gray-200
                  prose-code:text-[#a50044]
                  prose-code:rounded
                  prose-code:px-1
                  dark:prose-code:bg-white/10
                  dark:prose-code:text-pink-300

                  prose-img:rounded-3xl
                  prose-img:border
                  prose-img:border-gray-200
                  prose-img:shadow-md
                  dark:prose-img:border-white/10
                  dark:prose-img:shadow-2xl

                  max-w-none
                `}
              >
                {Array.isArray(post.body) && <PortableText value={post.body} />}
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* ================= RELATED ================= */}
      <RelatedPosts slug={safeSlug} categories={categories} />

      <Footer />
    </>
  );
}
