/* eslint-disable @typescript-eslint/no-explicit-any */
// components/seo/BlogJsonLd.tsx

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: any[];
  author: {
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

interface BlogJsonLdProps {
  post: BlogPost;
}

export function BlogJsonLd({ post }: BlogJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://laamilabs.co.ke';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || `Read ${post.title} by ${post.author.name}`,
    image: post.coverImage || `${baseUrl}/og-default-blog.jpg`,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      image: post.author.avatar || undefined,
      description: post.author.bio || undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LAAMI LABS',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}