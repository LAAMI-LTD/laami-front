import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const SITE_URL = "https://laamilabs.co.ke";
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...20]{title, excerpt, publishedAt, slug, author->{name}, categories[]->{title}}`;
const xml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export async function GET() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, { next: { revalidate: 3600 } });
  const items = posts.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug.current}`;
    return `<item><title>${xml(post.title || "Untitled")}</title><link>${url}</link><guid isPermaLink="true">${url}</guid>${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}<description>${xml(post.excerpt || "")}</description>${post.author?.name ? `<author>${xml(post.author.name)}</author>` : ""}${(post.categories || []).map((category: { title?: string }) => `<category>${xml(category.title || "")}</category>`).join("")}</item>`;
  }).join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>LAAMI LTD Blog</title><link>${SITE_URL}/blog</link><description>Ideas and practical guides from LAAMI LTD.</description><language>en-KE</language><atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
