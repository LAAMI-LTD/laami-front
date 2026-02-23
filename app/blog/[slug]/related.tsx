/* eslint-disable @typescript-eslint/no-explicit-any */
// components/blog/RelatedPosts.tsx - REDESIGNED

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedPostsProps {
  currentPostId: string;
  tags: string[];
}

async function getRelatedPosts(currentPostId: string, tags: string[]) {
  try {
    // First try to get related posts by tags
    if (tags && tags.length > 0) {
      const tag = tags[0];
      const relatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/related/${currentPostId}?tag=${tag}&limit=3`,
        {
          next: { revalidate: 300 },
        },
      );

      if (relatedRes.ok) {
        const relatedPosts = await relatedRes.json();
        if (relatedPosts.length >= 3) {
          return relatedPosts;
        }

        // If we have some related posts but not enough, get random ones to fill
        if (relatedPosts.length > 0 && relatedPosts.length < 3) {
          const randomRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blogs/random/${currentPostId}?limit=${3 - relatedPosts.length}`,
            {
              next: { revalidate: 300 },
            },
          );

          if (randomRes.ok) {
            const randomPosts = await randomRes.json();
            return [...relatedPosts, ...randomPosts];
          }
        }
      }
    }

    // If no related posts or tag fetch failed, get random posts
    const randomRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/random/${currentPostId}?limit=3`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!randomRes.ok) {
      return [];
    }

    return await randomRes.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function RelatedPosts({ currentPostId, tags }: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentPostId, tags);

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop/Tablet: Grid Layout */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post: any, index: number) => {
          const isEven = index % 2 === 0;
          const accentColor = isEven ? "#8a0038" : "#004d98";
          const accentColorClass = isEven
            ? "text-[#8a0038] dark:text-[#ff6b9d]"
            : "text-[#004d98] dark:text-[#6b9dff]";
          const hoverBorderClass = isEven
            ? "hover:border-[#8a0038] dark:hover:border-[#ff6b9d]"
            : "hover:border-[#004d98] dark:hover:border-[#6b9dff]";

          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className={`group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 ${hoverBorderClass} transition-all duration-300 hover:shadow-lg`}
            >
              {/* Cover Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span className="text-6xl font-bold text-white/20">
                      {post.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className={`text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:${accentColorClass} transition-colors line-clamp-2`}
                >
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt || "Read this article for more insights..."}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime || "5"} min</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-sm ${accentColorClass} font-medium group-hover:gap-2.5 transition-all`}
                  >
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: Horizontal Carousel */}
      <div className="sm:hidden relative">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 w-max pb-2">
            {relatedPosts.map((post: any, index: number) => {
              const isEven = index % 2 === 0;
              const accentColor = isEven ? "#8a0038" : "#004d98";
              const accentColorClass = isEven
                ? "text-[#8a0038] dark:text-[#ff6b9d]"
                : "text-[#004d98] dark:text-[#6b9dff]";
              const hoverBorderClass = isEven
                ? "active:border-[#8a0038] dark:active:border-[#ff6b9d]"
                : "active:border-[#004d98] dark:active:border-[#6b9dff]";

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className={`group flex-shrink-0 w-[280px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 ${hoverBorderClass} transition-all duration-300 active:shadow-lg`}
                >
                  {/* Cover Image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-active:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                      >
                        <span className="text-6xl font-bold text-white/20">
                          {post.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className={`text-base font-semibold text-gray-900 dark:text-white mb-2 group-active:${accentColorClass} transition-colors line-clamp-2`}
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                      {post.excerpt || "Read this article for more insights..."}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime || "5"} min</span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-xs ${accentColorClass} font-medium group-active:gap-2 transition-all`}
                      >
                        Read
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Scroll indicators - optional */}
        <div className="flex justify-center gap-1.5 mt-3">
          {relatedPosts.map((_: any, i: number) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i === 0
                  ? "bg-gray-600 dark:bg-gray-400"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Explore More Blogs Button */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-3 
               bg-linear-to-r from-[#a50044] to-[#8a0038] 
               text-white font-semibold rounded-xl 
               hover:shadow-lg hover:scale-[1.02] 
               transition-all duration-300"
        >
          Explore More Blogs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
