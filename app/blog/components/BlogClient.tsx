// app/blog/components/BlogClient.tsx (Client Component)
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

interface BlogClientProps {
    initialPosts: SanityDocument[];
    categories: string[];
    authors: string[];
    featuredPosts: SanityDocument[];
    latestPosts: SanityDocument[];
    sidebarPost: SanityDocument;
}

export default function BlogClient({
    initialPosts,
    categories,
    authors,
    featuredPosts,
    latestPosts,
    sidebarPost
}: BlogClientProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const toggleAuthor = (author: string) => {
        setSelectedAuthors((prev) =>
            prev.includes(author)
                ? prev.filter((a) => a !== author)
                : [...prev, author]
        );
    };

    const filteredPosts = useMemo(() => {
        let filtered = [...initialPosts];

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((post) =>
                post.categories?.some((cat: any) =>
                    selectedCategories.includes(cat.title)
                )
            );
        }

        if (selectedAuthors.length > 0) {
            filtered = filtered.filter((post) =>
                selectedAuthors.includes(post.author?.name)
            );
        }

        return filtered;
    }, [initialPosts, selectedCategories, selectedAuthors]);

    return (
        <div className="bg-gray-800 min-h-screen">


            <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-4">

                {/* Latest & Featured Section */}
                <div className="flex flex-col flex-wrap md:flex-row md:-mx-4 my-8">
                    <div className="w-full md:w-2/3 mb-4 lg:mb-0">
                        <div className="md:mx-4">
                            <h2 className="border-b-2 border-[#a50044] mb-4">
                                <span className="bg-[#a50044] px-2 py-1 text-white uppercase tracking-wide">Latest</span>
                            </h2>

                            {/* Filters */}
                            <div className="mb-6 flex flex-wrap gap-4">
                                {categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => toggleCategory(cat)}
                                                className={`text-xs px-3 py-1 rounded transition ${selectedCategories.includes(cat)
                                                    ? 'bg-[#a50044] text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {authors.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {authors.map(author => (
                                            <button
                                                key={author}
                                                onClick={() => toggleAuthor(author)}
                                                className={`text-xs px-3 py-1 rounded transition ${selectedAuthors.includes(author)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    }`}
                                            >
                                                {author}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Latest Posts */}
                            {filteredPosts.slice(0, 4).map((post, idx) => (
                                <div key={post._id}>
                                    <div className="flex flex-wrap items-center md:-mx-2">
                                        <div className="w-full md:w-3/12">
                                            <div className="md:mx-2">
                                                {post.mainImage && (
                                                    <Image
                                                        src={urlFor(post.mainImage).width(400).url()}
                                                        alt={post.title}
                                                        width={400}
                                                        height={300}
                                                        className="w-full mb-4 md:mb-0 object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="md:w-9/12">
                                            <div className="md:mx-2">
                                                <h2 className="text-white font-bold text-2xl pb-4 leading-tight">
                                                    <Link href={`/blog/${post.slug.current}`} className="text-white hover:underline">{post.title}</Link>
                                                </h2>
                                                <p className="text-gray-400 pb-2">{post.excerpt}</p>
                                                <div className="text-gray-200 inline-block py-1 italic text-sm">
                                                    Posted on: <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
                                                    by <Link href="#" className="underline hover:no-underline">{post.author?.name || 'Anonymous'}</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full mb-5 pb-5 border-b border-gray-700 md:mx-2"></div>
                                    </div>
                                </div>
                            ))}

                            {filteredPosts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-400">No posts found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 mb-4 lg:mb-0">
                        <div className="md:mx-4">
                            <h2 className="border-b-2 border-indigo-600 mb-4">
                                <span className="bg-indigo-600 px-2 py-1 text-white uppercase tracking-wide">Featured</span>
                            </h2>
                            {sidebarPost?.mainImage && (
                                <Image
                                    src={urlFor(sidebarPost.mainImage).width(600).url()}
                                    alt={sidebarPost.title}
                                    width={600}
                                    height={400}
                                    className="w-full mb-4 object-cover"
                                />
                            )}
                            <h2 className="text-white font-bold text-2xl pb-4 leading-tight">
                                <Link href={`/blog/${sidebarPost?.slug?.current}`} className="text-white hover:underline">{sidebarPost?.title}</Link>
                            </h2>
                            <p className="text-gray-400 pb-2">{sidebarPost?.excerpt}</p>
                            <div className="text-gray-200 inline-block py-1 italic text-sm">
                                Posted on: <time dateTime={sidebarPost?.publishedAt}>{sidebarPost ? new Date(sidebarPost.publishedAt).toLocaleDateString() : ''}</time>
                                by <Link href="#" className="underline hover:no-underline">{sidebarPost?.author?.name || 'Anonymous'}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
        .gradient {
          background-image: linear-gradient(
            to bottom,
            rgba(243, 244, 246, 0.1),
            rgba(0, 0, 0, 0.8)
          );
        }
        
        .group:hover .group-hover\\:translate-y-0 {
          transform: translateY(0);
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background-color: rgba(31, 41, 55, 0.9);
        }

        ::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }

        ::selection {
          background: rgb(107 114 128);
        }
        ::-moz-selection {
          background: rgb(107 114 128);
        }
      `}</style>
        </div>
    );
}