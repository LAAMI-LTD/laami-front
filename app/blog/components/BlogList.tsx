'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Blog } from '../types/blog.types';
import { formatDate, getInitials, getFirstParagraph, calculateReadTime } from '../utils/blog.utils';

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-6">
      {blogs.map((blog, index) => (
        <article
          key={blog._id}
          className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-[#a50044] dark:hover:border-[#a50044] overflow-hidden transition-all duration-300 hover:shadow-2xl"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <div className="flex flex-col md:flex-row">
            {blog.coverImage ? (
              <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="relative w-full md:w-64 h-48 md:h-auto bg-gradient-to-br from-[#a50044] to-[#004d98] flex items-center justify-center shrink-0">
                <Sparkles className="w-12 h-12 text-white/30" />
              </div>
            )}

            <div className="flex-1 p-6 flex flex-col">
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#a50044]/10 text-[#a50044] dark:text-[#ff6b9d] text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#a50044] dark:group-hover:text-[#ff6b9d] transition-colors">
                  {blog.title}
                </h2>
              </Link>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                {getFirstParagraph(blog)}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  {blog.author.avatar ? (
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a50044] to-[#8a0038] flex items-center justify-center text-white font-semibold text-xs">
                      {getInitials(blog.author.name)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {blog.author.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <time>{formatDate(blog.createdAt)}</time>
                      <span>•</span>
                      <span>{calculateReadTime(blog.content)} min read</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex items-center gap-2 text-[#a50044] hover:text-[#8a0038] dark:text-[#ff6b9d] dark:hover:text-[#ff8ab8] font-semibold text-sm transition-colors group/link"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}