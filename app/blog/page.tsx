/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useBlogFilters } from "./hooks/useBlogFilters";
import {
  Blog,
  PaginatedResponse,
  PaginationState,
  ToastState,
  ToastType,
} from "./types/blog.types";
import { Search, X } from "lucide-react";
import Link from "next/link";
import LoadingState from "./components/LoadingState";
import BlogHeader from "./components/BlogHeader";
import BlogHero from "./components/BlogHero";
import BlogFilters from "./components/BlogFilters";
import BlogStatsBar from "./components/BlogStatsBar";
import BlogGrid from "./components/BlogGrid";
import BlogList from "./components/BlogList";
import BlogPagination from "./components/BlogPagination";
import ShareMenu from "./components/ShareMenu";
import ToastNotification from "./components/ToastNotification";
import Footer from "../components/footer";
import SubscriptionStatus from "./components/NewsletterSection";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    total: 0,
    totalPages: 0,
  });

  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  // Custom filter hook
  const {
    filters,
    filteredAndSortedBlogs,
    updateSearchTerm,
    updateSelectedTag,
    updateSortBy,
    clearFilters,
    hasActiveFilters,
  } = useBlogFilters(blogs);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    }
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(e.target as Node)
      ) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, filters.selectedTag]);

  async function fetchBlogs() {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", "10");

      if (filters.selectedTag) {
        params.append("tag", filters.selectedTag);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data: PaginatedResponse = await res.json();
      setBlogs(data.blogs);
      setPagination({
        page: data.page,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (err: any) {
      setError(err.message || "Failed to load blogs");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  }

  // Share functionality
  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToast({ show: true, message, type });
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
    },
    [],
  );

  const copyToClipboard = useCallback(async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast("Failed to copy link", "error");
    }
  }, [showToast]);

  if (loading && blogs.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#000213] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-6 py-3 bg-linear-to-r from-[#a50044] to-[#8a0038] text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
               text-gray-700 dark:text-gray-300 hover:bg-gray-100 
               dark:hover:bg-gray-800 transition"
            >
              Go Home
            </Link>

            <Link
              href="/portfolio"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
               text-gray-700 dark:text-gray-300 hover:bg-gray-100 
               dark:hover:bg-gray-800 transition"
            >
              View Portfolio
            </Link>

            <Link
              href="/contacts"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
               text-gray-700 dark:text-gray-300 hover:bg-gray-100 
               dark:hover:bg-gray-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#000213] transition-colors duration-300">
      <BlogHero
        totalArticles={pagination.total}
        searchTerm={filters.searchTerm}
        onSearchChange={updateSearchTerm}
      />
      <BlogHeader
        scrolled={scrolled}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      {showFilters && (
        <BlogFilters
          blogs={blogs}
          selectedTag={filters.selectedTag}
          sortBy={filters.sortBy}
          searchTerm={filters.searchTerm}
          onTagChange={updateSelectedTag}
          onSortChange={updateSortBy}
          onSearchClear={() => updateSearchTerm("")}
          onClearAll={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      )}

      <BlogStatsBar
        totalFiltered={filteredAndSortedBlogs.length}
        totalAll={pagination.total}
        onShareClick={() => setShowShareMenu(!showShareMenu)}
      />

      <main className=" px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedBlogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-[#a50044]/20 to-[#004d98]/20 flex items-center justify-center">
              <Search className="w-10 h-10 text-[#a50044]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {filters.searchTerm || filters.selectedTag
                ? "We couldn't find any articles matching your criteria. Try adjusting your filters."
                : "No blog posts have been published yet."}
            </p>
            {filters.searchTerm || filters.selectedTag ? (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-linear-to-r from-[#a50044] to-[#8a0038] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                href="/blog/add"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#a50044] to-[#8a0038] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Create First Post
              </Link>
            )}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <BlogGrid blogs={filteredAndSortedBlogs} />
            ) : (
              <BlogList blogs={filteredAndSortedBlogs} />
            )}

            <BlogPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page: any) =>
                setPagination((prev) => ({ ...prev, page }))
              }
            />
          </>
        )}
      </main>

      <SubscriptionStatus email={user?.email} />

      <ShareMenu
        isOpen={showShareMenu}
        onClose={() => setShowShareMenu(false)}
        copied={copied}
        onCopy={copyToClipboard}
        menuRef={shareMenuRef}
      />

      <ToastNotification toast={toast} />
      <Footer />
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
