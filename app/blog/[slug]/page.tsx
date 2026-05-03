/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { Roboto } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";

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

// Generate metadata for social sharing (optimized for WhatsApp & all platforms)
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options,
  );

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Generate multiple image sizes for different platforms
  const ogImage = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null;

  const whatsappImage = post.mainImage
    ? urlFor(post.mainImage)?.width(800).height(420).url()
    : null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
  const fullUrl = `${baseUrl}/blog/${slug}`;

  // Truncate description for WhatsApp (recommended ~150 chars)
  const description = post.excerpt
    ? post.excerpt.length > 160
      ? `${post.excerpt.substring(0, 157)}...`
      : post.excerpt
    : `Read ${post.title} on our blog.`;

  // Get site name from env or default
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Your Blog Name";

  // Get social media handles
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@yourhandle";
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";

  return {
    title: `${post.title} | ${siteName}`,
    description: description,
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    keywords: post.categories?.map((c: any) => c.title).join(", "),

    // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.categories?.map((c: any) => c.title),
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
              type: "image/jpeg",
            },
          ]
        : [],
      url: fullUrl,
      siteName: siteName,
      locale: "en_KE",
      determiner: "auto",
    },

    // Twitter Card (X/Twitter)
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: ogImage ? [ogImage] : [],
      creator: twitterHandle,
      site: twitterHandle,
    },

    // Additional meta tags for better platform support
    alternates: {
      canonical: fullUrl,
    },

    // For rich previews on messaging apps
    other: {
      // WhatsApp specific (uses Open Graph)
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": post.title,
      "og:image:type": "image/jpeg",

      // For iMessage and other iOS sharing
      "apple-mobile-web-app-title": post.title,

      // For better link previews
      "twitter:image:alt": post.title,
      "twitter:image:width": "1200",
      "twitter:image:height": "630",

      // Facebook App ID for analytics
      ...(facebookAppId && { "fb:app_id": facebookAppId }),

      // Article metadata
      "article:published_time": post.publishedAt,
      "article:author": post.author?.name || "",
      "article:section": post.categories?.[0]?.title || "Blog",

      // For WhatsApp link previews (helps with caching)
      "cache-control": "max-age=31536000",
    },
  };
}

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

  // JSON-LD Structured Data for better search and social previews
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: heroImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Anonymous",
      image: authorImage,
    },
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME || "Your Blog Name",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${safeSlug}`,
    },
    keywords: categories.join(", "),
  };

  const portableComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="mt-20 text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white relative">
          <span className="absolute -left-4 top-1 h-full w-1 bg-[#a50044] rounded" />
          {children}
        </h2>
      ),

      h3: ({ children }: any) => (
        <h3 className="mt-14 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {children}
        </h3>
      ),

      normal: ({ children }: any) => (
        <p className="text-lg leading-[1.95] text-gray-700 dark:text-white/80 my-5">
          {children}
        </p>
      ),

      blockquote: ({ children }: any) => (
        <div className="my-12 relative">
          <div className="absolute -left-2 top-0 h-full w-1 bg-[#a50044] rounded" />
          <blockquote className="pl-6 italic text-xl md:text-2xl font-medium text-gray-900 dark:text-white/90">
            {children}
          </blockquote>
        </div>
      ),
    },

    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-[#a50044] tracking-tight">
          {children}
        </strong>
      ),

      em: ({ children }: any) => (
        <em className="text-[#004d98] font-semibold not-italic">{children}</em>
      ),

      link: ({ value, children }: any) => (
        <a
          href={value?.href}
          className="text-[#a50044] underline decoration-2 underline-offset-4 hover:text-[#b43968]"
        >
          {children}
        </a>
      ),
    },

    types: {
      image: ({ value }: any) => {
        // ✅ FIX: Guarantee a string before passing to Image
        const imageUrl = urlFor(value)?.width(1600).url();

        if (!imageUrl) return null;

        return (
          <figure className="my-14 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl">
            <Image
              src={imageUrl}
              alt="blog image"
              width={1600}
              height={900}
              className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </figure>
        );
      },
    },
  };

  return (
    <>
      {/* Add JSON-LD structured data to head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
                {Array.isArray(post.body) && (
                  <PortableText
                    value={post.body}
                    components={portableComponents}
                  />
                )}
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
