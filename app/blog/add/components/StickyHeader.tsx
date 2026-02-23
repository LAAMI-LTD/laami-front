"use client";

import { ArrowLeft, Code, Layout, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { ViewMode, ContentMode } from "../types";

interface StickyHeaderProps {
  scrolled: boolean;
  viewMode: ViewMode;
  contentMode: ContentMode;
  onViewModeChange: (mode: ViewMode) => void;
  onContentModeChange: (mode: ContentMode) => void;
  isEditing?: boolean;
}

export default function StickyHeader({
  scrolled,
  viewMode,
  contentMode,
  onViewModeChange,
  onContentModeChange,
  isEditing = false,
}: StickyHeaderProps) {
  const router = useRouter();

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-xl bg-white/80 dark:bg-[#000213]/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors group"
            >
              <div className="p-2 rounded-lg group-hover:bg-[#a50044]/10 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline font-medium">Back</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
            
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => onViewModeChange("editor")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "editor"
                    ? "bg-white dark:bg-gray-700 text-[#a50044] shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Code className="w-4 h-4" />
                <span className="hidden lg:inline">Editor</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("split")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "split"
                    ? "bg-white dark:bg-gray-700 text-[#a50044] shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Layout className="w-4 h-4" />
                <span className="hidden lg:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("preview")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "preview"
                    ? "bg-white dark:bg-gray-700 text-[#a50044] shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden lg:inline">Preview</span>
              </button>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => onContentModeChange("blocks")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  contentMode === "blocks"
                    ? "bg-white dark:bg-gray-700 text-[#a50044] shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Blocks
              </button>
              <button
                type="button"
                onClick={() => onContentModeChange("html")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  contentMode === "html"
                    ? "bg-white dark:bg-gray-700 text-[#a50044] shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                HTML
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}