'use client';

import { Tag, Search, X, SlidersHorizontal } from 'lucide-react';
import { SortBy, Blog } from '../types/blog.types';
import { getAllTags } from '../utils/blog.utils';

interface BlogFiltersProps {
  blogs: Blog[];
  selectedTag: string | null;
  sortBy: SortBy;
  searchTerm: string;
  onTagChange: (tag: string | null) => void;
  onSortChange: (sort: SortBy) => void;
  onSearchClear: () => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export default function BlogFilters({
  blogs,
  selectedTag,
  sortBy,
  searchTerm,
  onTagChange,
  onSortChange,
  onSearchClear,
  onClearAll,
  hasActiveFilters,
}: BlogFiltersProps) {
  const allTags = getAllTags(blogs);

  return (
    <div className="relative z-30 animate-slideDown">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-sm border border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-[#000213]/70 backdrop-blur-xl shadow-lg">

          {/* Top controls */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between p-5">

            {/* Sort */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <SlidersHorizontal className="w-4 h-4" />
                Sort
              </div>

              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortBy)}
                className="min-w-42.5 rounded-lg border border-gray-300/70 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a50044]"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A – Z</option>
              </select>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-1">
                  <Tag className="w-4 h-4" />
                  Topics
                </span>

                {/* All */}
                <button
                  onClick={() => onTagChange(null)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all
                    ${
                      !selectedTag
                        ? 'bg-gradient-to-r from-[#a50044] to-[#8a0038] text-white shadow ring-2 ring-[#a50044]/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-[1.03]'
                    }`}
                >
                  All
                </button>

                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      onTagChange(tag === selectedTag ? null : tag)
                    }
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all
                      ${
                        selectedTag === tag
                          ? 'bg-gradient-to-r from-[#a50044] to-[#8a0038] text-white shadow ring-2 ring-[#a50044]/30'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-[1.03]'
                      }`}
                  >
                    {tag}
                  </button>
                ))}

                {allTags.length > 8 && (
                  <span className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    +{allTags.length - 8} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="border-t border-gray-200/70 dark:border-gray-800/70 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">

                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-1">
                  Active filters
                </span>

                {selectedTag && (
                  <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm
                    bg-[#a50044]/10 text-[#a50044] dark:text-[#ff6b9d]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{selectedTag}</span>
                    <button
                      onClick={() => onTagChange(null)}
                      className="rounded-full p-0.5 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {searchTerm && (
                  <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm
                    bg-[#004d98]/10 text-[#004d98] dark:text-[#5ba3ff]">
                    <Search className="w-3.5 h-3.5" />
                    <span>&quot;{searchTerm}&quot;</span>
                    <button
                      onClick={onSearchClear}
                      className="rounded-full p-0.5 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={onClearAll}
                  className="ml-auto text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#a50044] dark:hover:text-[#ff6b9d] transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
