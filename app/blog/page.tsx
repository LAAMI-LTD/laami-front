// app/blog/page.tsx (Server Component)
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type Metadata } from "next";
import { client } from "@/sanity/client";

import BlogHero from "./components/BlogHero";
import Footer from "../components/footer";
import FilterablePosts, { type BlogPost } from "./components/Filters";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(featured desc, publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featured,
  readingTime,
  mainImage,
  author->{
    name,
    image
  },
  categories[]->{
    title
  }
}`;

const options = { next: { revalidate: 30 } };
const siteUrl = "https://laamilabs.co.ke";

export const metadata: Metadata = {
  title: "Insights & Stories | LAAMI LTD Blog",
  description: "Ideas, practical guides, and stories on software, design, branding, and building businesses in Kenya and across Africa.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Insights & Stories | LAAMI LTD Blog",
    description: "Ideas, practical guides, and stories on software, design, branding, and building businesses in Kenya and across Africa.",
    siteName: "LAAMI LTD",
    locale: "en_KE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LAAMI LTD Blog" }],
  },
  twitter: { card: "summary_large_image", title: "LAAMI LTD Blog", description: "Ideas and practical guides from LAAMI LTD.", images: ["/og-image.png"] },
};

export default async function IndexPage() {
  const posts = await client.fetch<BlogPost[]>(POSTS_QUERY, {}, options);

  const categories = Array.from(
    new Set(
      posts.flatMap((post) => post.categories?.map((cat) => cat.title) ?? []).filter(Boolean),
    ),
  ) as string[];

  const authors = Array.from(
    new Set(
      posts
        .map((post) => post.author?.name)
        .filter((author): author is string => Boolean(author)),
    ),
  );

  return (
    <>
      <BlogHero />
      <FilterablePosts
        initialPosts={posts}
        categories={categories}
        authors={authors}
      />
      <Footer />
    </>
  );
}
