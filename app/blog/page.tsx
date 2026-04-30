// app/blog/page.tsx (Server Component)
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

import BlogHero from "./components/BlogHero";
import Footer from "../components/footer";
import FilterablePosts from "./components/Filters";

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

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  const categories = Array.from(
    new Set(
      posts.flatMap((post) => post.categories?.map((cat: any) => cat.title)),
    ),
  );

  const authors = Array.from(
    new Set(posts.map((post) => post.author?.name).filter(Boolean)),
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
