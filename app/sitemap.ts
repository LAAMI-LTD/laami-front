import { type MetadataRoute } from "next";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const SITE_URL = "https://laamilabs.co.ke";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SanityDocument[]>(
    `*[_type == "post" && defined(slug.current)]{slug, _updatedAt, publishedAt}`,
    {},
    { next: { revalidate: 3600 } },
  );

  const staticPages = ["", "/services", "/portfolio", "/contacts", "/blog"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug.current}`,
      lastModified: post._updatedAt || post.publishedAt ? new Date(post._updatedAt || post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
