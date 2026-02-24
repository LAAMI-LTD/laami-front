/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/[slug]/page.tsx - REDESIGNED WITH IMPROVED SHARE & OG METADATA

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Tag, User, ArrowLeft } from "lucide-react";
import { calculateReadTime, formatDate, generateSlug } from "./utils";
import { BlogJsonLd } from "./seo/BlogJsonLd";
import { BlogContentRenderer } from "./content";
import { AuthorCard } from "./author";
import { RelatedPosts } from "./related";
import { TableOfContents } from "./Toc";
import { CollapsibleToc } from "./CollapsibleToc";
import Footer from "@/app/components/footer";
import { EditButtonWrapper } from "./EditButtonWrapper";
import { ShareButtons } from "./share";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: ContentBlock[];
  author: {
    _id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  published: boolean;
  publishedAt?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "image"
    | "code"
    | "quote"
    | "list"
    | "embed"
    | "link";
  data: any;
  order?: number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/slug/${slug}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch blog post: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function incrementViews(slug: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}/view`, {
      method: "POST",
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

function generateExcerpt(
  content: ContentBlock[],
  maxLength: number = 160,
): string {
  let text = "";
  for (const block of content) {
    if (block.type === "paragraph" || block.type === "heading") {
      text += block.data.text + " ";
    }
    if (text.length >= maxLength) break;
  }
  return text.length > maxLength
    ? text.substring(0, maxLength).trim() + "..."
    : text.trim() || "Read this insightful article on LAAMI LABS";
}

function generateSocialImage(post: BlogPost): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://laamilabs.co.ke";

  if (post.coverImage) {
    // Cloudinary: force exact 1200×630 crop — critical for WhatsApp
    if (post.coverImage.includes("cloudinary.com")) {
      return post.coverImage.replace(
        "/upload/",
        "/upload/w_1200,h_630,c_fill,q_auto,f_jpg/",
      );
    }
    return post.coverImage;
  }

  // Fallback: OG image generation endpoint
  const title = encodeURIComponent(post.title.slice(0, 70));
  const author = encodeURIComponent(post.author.name);
  const tags = encodeURIComponent(post.tags.slice(0, 3).join(", "));
  return `${baseUrl}/api/og?title=${title}&author=${author}&tags=${tags}`;
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | LAAMI LABS",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://laamilabs.co.ke";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  // WhatsApp reads og:description — keep it tight: 2–4 sentences max, under 300 chars
  const rawExcerpt = post.excerpt || generateExcerpt(post.content, 160);
  const description =
    rawExcerpt.length > 200 ? rawExcerpt.slice(0, 197) + "..." : rawExcerpt;

  const socialImage = generateSocialImage(post);
  const publishedTime = post.publishedAt || post.createdAt;
  const authorUrl = `${baseUrl}/blog/author/${generateSlug(post.author.name)}`;

  // Title: WhatsApp shows ~60 chars — keep OG title shorter than the page <title>
  const ogTitle =
    post.title.length > 60 ? post.title.slice(0, 57) + "..." : post.title;

  return {
    title: `${post.title} | LAAMI LABS Blog`,
    description,
    authors: [{ name: post.author.name, url: authorUrl }],
    keywords: [
      ...post.tags,
      "tutorial",
      "software development",
      "programming",
      "tech blog",
    ],

    openGraph: {
      title: ogTitle, // shorter for WhatsApp card title
      description,
      url: postUrl,
      siteName: "LAAMI LABS",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: post.title,
          // Always use jpeg for best WhatsApp compatibility
          type: "image/jpeg",
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime: post.updatedAt,
      authors: [authorUrl],
      tags: post.tags,
      section: post.tags[0] || "Technology",
    },

    twitter: {
      card: "summary_large_image",
      title: `${post.title} | LAAMI LABS`,
      description,
      images: [socialImage],
      creator: "@laamilabs",
      site: "@laamilabs",
    },

    // Explicit og: properties — WhatsApp's crawler is strict about these
    other: {
      // Image dimensions must be explicit — WhatsApp skips images without them
      "og:image": socialImage,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/jpeg",
      "og:image:alt": ogTitle,
      "og:url": postUrl,
      "og:type": "article",
      "og:title": ogTitle,
      "og:description": description,
      "og:site_name": "LAAMI LABS",
      "og:updated_time": post.updatedAt,

      // Article schema
      "article:published_time": publishedTime,
      "article:modified_time": post.updatedAt,
      "article:section": post.tags[0] || "Technology",
      "article:tag": post.tags.join(", "),
      "article:author": post.author.name,

      // Twitter extras
      "twitter:label1": "Written by",
      "twitter:data1": post.author.name,
      "twitter:label2": "Reading time",
      "twitter:data2": `${calculateReadTime(post.content)} min read`,

      // Facebook specific
      "fb:app_id": "YOUR_FB_APP_ID", // Replace with your Facebook App ID if you have one
      "og:see_also": baseUrl,

      // Pinterest
      "pinterest:richpins": "enabled",

      // LinkedIn specific
      "linkedin:author": authorUrl,

      // Slack/Discord unfurl
      "theme-color": "#8a0038",

      // WhatsApp specific (some clients read these)
      "og:whatsapp:title": ogTitle,
      "og:whatsapp:description": description,
      "og:whatsapp:image": socialImage,

      // iMessage
      "apple:content-type": "article",
    },

    alternates: { canonical: postUrl },

    robots: {
      index: post.published,
      follow: post.published,
      googleBot: {
        index: post.published,
        follow: post.published,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  incrementViews(slug);

  const readTime = calculateReadTime(post.content);
  const publishDate = post.publishedAt || post.createdAt;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://laamilabs.co.ke";
  const socialImage = generateSocialImage(post);
  const shareUrl = `${baseUrl}/blog/${post.slug}`;
  const shareDescription = post.excerpt || generateExcerpt(post.content, 120);

  return (
    <>
      <BlogJsonLd post={post} />

      <article className="min-h-screen pt-20 bg-white dark:bg-gray-950">
        {/* ── Sticky Header ────────────────────────────────────── */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-gray-950/90 border-b-2 border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#8a0038] dark:hover:text-[#ff6b9d] transition-colors group"
              >
                <div className="p-2 rounded-lg border-2 border-transparent group-hover:border-[#8a0038] dark:group-hover:border-[#ff6b9d] transition-all">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </div>
                <span className="hidden sm:inline">Back to Blog</span>
              </Link>

              <div className="flex items-center gap-4">
                <EditButtonWrapper
                  slug={post.slug}
                  authorId={post.author._id}
                />

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white">
                  <Clock className="w-4 h-4 text-[#8a0038] dark:text-[#ff6b9d]" />
                  <span>{readTime} min</span>
                </div>

                {/* Compact share buttons for sticky header */}
                <ShareButtons
                  url={shareUrl}
                  title={post.title}
                  description={shareDescription}
                  image={socialImage}
                  variant="compact"
                  showLabels={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="relative border-b-2 border-gray-200 dark:border-gray-800">
          {post.coverImage ? (
            <div className="relative w-full h-[60vh] lg:h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50" />

              {post.tags && post.tags.length > 0 && (
                <div className="absolute top-8 left-0 right-0 z-10">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border-2 border-white dark:border-gray-700 text-[#8a0038] dark:text-[#ff6b9d] text-sm font-medium hover:bg-[#8a0038] hover:text-white dark:hover:bg-[#ff6b9d] dark:hover:text-gray-900 hover:border-[#8a0038] dark:hover:border-[#ff6b9d] transition-all duration-300 shadow-lg"
                        >
                          <Tag className="w-4 h-4" />
                          <span>{tag}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-950 border-t-4 border-[#8a0038]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-white dark:bg-gray-900">
              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8a0038] text-white text-sm font-medium hover:bg-[#6d002d] transition-all duration-300 shadow-md"
                      >
                        <Tag className="w-4 h-4" />
                        <span>{tag}</span>
                      </Link>
                    ))}
                  </div>
                )}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight border-l-8 border-[#8a0038] pl-6">
                  {post.title}
                </h1>
              </div>
            </div>
          )}
        </div>

        {/* ── Meta Bar ─────────────────────────────────────────── */}
        <div className="border-b-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-wrap items-center gap-8">
              <Link
                href={`/blog/author/${generateSlug(post.author.name)}`}
                className="flex items-center gap-4 group"
              >
                <div className="relative">
                  {post.author.avatar ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-gray-200 dark:ring-gray-700 group-hover:ring-[#8a0038] dark:group-hover:ring-[#ff6b9d] transition-all">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#8a0038] flex items-center justify-center ring-4 ring-gray-200 dark:ring-gray-700 group-hover:ring-[#8a0038] transition-all">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#8a0038] dark:group-hover:text-[#ff6b9d] transition-colors">
                    {post.author.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Author
                  </div>
                </div>
              </Link>

              <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />

              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                <Calendar className="w-5 h-5 text-[#8a0038] dark:text-[#ff6b9d]" />
                <time
                  dateTime={publishDate}
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {formatDate(publishDate)}
                </time>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                <Clock className="w-5 h-5 text-[#004d98] dark:text-[#6b9dff]" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {readTime} min read
                </span>
              </div>
            </div>

            {post.excerpt && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────── */}
        <div className="mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                    Contents
                  </h3>
                </div>
                <TableOfContents content={post.content} />
              </div>
            </aside>

            {/* Article body */}
            <div className="lg:col-span-9">
              <div className="lg:hidden mb-8">
                <CollapsibleToc content={post.content} />
              </div>

              <div
                className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:scroll-mt-24 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-[#8a0038] prose-h2:pl-6
                prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:font-normal
                prose-a:text-[#8a0038] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-8 prose-img:border-4 prose-img:border-gray-200 dark:prose-img:border-gray-800
                prose-pre:bg-gray-900 dark:prose-pre:bg-black prose-pre:shadow-xl prose-pre:border-2 prose-pre:border-gray-700 prose-pre:rounded-2xl
                prose-code:text-[#004d98] dark:prose-code:text-[#6b9dff] prose-code:font-medium prose-code:before:content-[''] prose-code:after:content-[''] prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-blockquote:border-l-8 prose-blockquote:border-[#8a0038] prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-normal
                prose-ul:my-6 prose-li:my-2
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold"
              >
                <BlogContentRenderer content={post.content} />
              </div>

              {/* Share section after content */}
              <div className="mt-12 p-8 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-[#8a0038] rounded-full" />
                  Share this article
                </h3>
                <ShareButtons
                  url={shareUrl}
                  title={post.title}
                  description={shareDescription}
                  image={socialImage}
                  variant="full"
                  showLabels={false}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 p-8 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-800">
                    <Tag className="w-6 h-6 text-[#8a0038]" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                      Topics
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                        className="px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:bg-[#8a0038] hover:text-white hover:border-[#8a0038] dark:hover:bg-[#ff6b9d] dark:hover:text-gray-900 dark:hover:border-[#ff6b9d] transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Card */}
              <div className="mt-12 p-8 bg-white dark:bg-gray-900 rounded-2xl border-4 border-[#8a0038] shadow-xl">
                <AuthorCard author={post.author} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Posts ─────────────────────────────────────── */}
        <div className="border-t-4 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="mb-12 border-l-8 border-[#8a0038] pl-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
                Continue Reading
              </h2>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                More articles you might enjoy
              </p>
            </div>
            <RelatedPosts currentPostId={post._id} tags={post.tags} />
          </div>
        </div>

        <Footer />
      </article>
    </>
  );
}
