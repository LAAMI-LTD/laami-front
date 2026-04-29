/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import BlogHero from "./components/BlogHero";
import Footer from "../components/footer";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

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

      <main className="min-h-screen bg-[#e3e4ee] text-gray-900 dark:bg-[#050816] dark:text-white">
        <section className="mx-auto p-1 md:px-6 md:py-14">
          {/* Filters */}
          <div className="mb-12 grid gap-5 rounded-sm border border-gray-200 bg-white/80 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl md:grid-cols-3">
            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#a50044]">
                Categories
              </h3>

              <div className="flex flex-wrap gap-2">
                {categories.map((category: any) => (
                  <button
                    key={category}
                    className="rounded-sm border border-[#a50044]/20 bg-[#a50044]/5 px-4 py-2 text-xs font-medium text-[#a50044] transition hover:bg-[#a50044] hover:text-white dark:border-[#a50044]/30 dark:bg-[#a50044]/10 dark:text-[#dca1b8] dark:hover:bg-[#a50044] dark:hover:text-white"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Authors */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#004d98]">
                Authors
              </h3>

              <div className="flex flex-wrap gap-2">
                {authors.map((author: any) => (
                  <button
                    key={author}
                    className="rounded-sm border border-[#004d98]/20 bg-[#004d98]/5 px-4 py-2 text-xs font-medium text-[#004d98] transition hover:bg-[#004d98] hover:text-white dark:border-[#004d98]/30 dark:bg-[#004d98]/10 dark:text-[#a0bbd8] dark:hover:bg-[#004d98] dark:hover:text-white"
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>

            {/* Archive */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2a68a8]">
                Archive
              </h3>

              <div className="flex flex-wrap gap-2">
                {["Latest", "This Month", "2026", "2025"].map((date) => (
                  <button
                    key={date}
                    className="rounded-sm border border-[#2a68a8]/20 bg-[#2a68a8]/5 px-4 py-2 text-xs font-medium text-[#2a68a8] transition hover:bg-[#2a68a8] hover:text-white dark:border-[#6391c0]/30 dark:bg-[#6391c0]/10 dark:text-[#a0bbd8] dark:hover:bg-[#2a68a8] dark:hover:text-white"
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid auto-rows-[260px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post, index) => {
              const large = index === 0 || index === 4 || index === 7;

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className={`group relative overflow-hidden rounded-sm border border-gray-200 bg-white shadow-md transition duration-500 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-gradient-to-br dark:from-[#111827] dark:to-[#0f172a] dark:hover:border-[#a50044]/40 dark:hover:shadow-2xl dark:hover:shadow-[#a50044]/10
                  
                  ${large ? "md:col-span-2 md:row-span-2" : ""}
                  `}
                >
                  {/* Background image */}
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(1200).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Overlay - Light mode uses white gradient, dark mode uses dark gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#004d98] via-[#004d98]/50 to-transparent " />

                  {/* Decorative gradients */}
                  <div className="absolute -left-10 -top-10 h-40 w-40 rounded-sm bg-[#a50044]/10 blur-3xl dark:bg-[#a50044]/20" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-sm bg-[#004d98]/10 blur-3xl dark:bg-[#004d98]/20" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {post.categories?.map((category: any) => (
                          <span
                            key={category.title}
                            className="rounded-sm bg-[#a50044] px-3 py-1 text-[10px] uppercase tracking-wider text-white"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>

                      {post.featured && (
                        <span className="rounded-sm bg-[#a50044] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Bottom */}
                    <div>
                      <div className="mb-4 flex items-center gap-3 text-xs text-white">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>

                        <span>•</span>

                        <span>{post.readingTime || 5} min read</span>

                        {post.author?.name && (
                          <>
                            <span>•</span>
                            <span>{post.author.name}</span>
                          </>
                        )}
                      </div>

                      <h2
                        className={`mb-3 font-black leading-tight text-white transition group-hover:text-[#a50044] dark:text-white dark:group-hover:text-[#dca1b8]
                        
                        ${large ? "text-4xl" : "text-2xl"}
                        `}
                      >
                        {post.title}
                      </h2>

                      <p
                        className={`max-w-2xl text-white
                        
                        ${large ? "text-base" : "text-sm"}
                        `}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
