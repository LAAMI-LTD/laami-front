/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blogs/feed.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://laamilabs.co.ke'; // Replace with your domain
  
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?published=true&limit=20`)
    .then(res => res.json())
    .then(data => data.blogs || [])
    .catch(() => []);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Laami Labs Blog</title>
    <link>${baseUrl}/blogs</link>
    <description>Latest articles and tutorials from Laami Labs</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blogs/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogs.map((blog: any) => `
      <item>
        <title><![CDATA[${blog.title}]]></title>
        <link>${baseUrl}/blogs/${blog.slug}</link>
        <guid isPermaLink="true">${baseUrl}/blogs/${blog.slug}</guid>
        <pubDate>${new Date(blog.publishedAt || blog.createdAt).toUTCString()}</pubDate>
        <description><![CDATA[${blog.excerpt || ''}]]></description>
        <author>${blog.author.email || blog.author.name}</author>
        ${blog.tags?.map((tag: string) => `<category>${tag}</category>`).join('')}
      </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}