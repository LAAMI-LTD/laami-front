/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Save, Send } from "lucide-react";
import { useAuthors } from "./hooks/useAuthors";
import { useBlogForm } from "./hooks/useBlogForm";
import { blocksToHtml, htmlToBlocksConverter } from "./utils/blockConverters";
import { EXAMPLE_HTML } from "./constants";
import { ContentMode, ViewMode, ContentBlock } from "./types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path

import StickyHeader from "./components/StickyHeader";
import BlogInfoCard from "./components/BlogInfoCard";
import ContentEditor from "./components/ContentEditor";
import NewAuthorForm from "./components/NewAuthorForm";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentMode, setContentMode] = useState<ContentMode>("blocks");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [htmlContent, setHtmlContent] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showNewAuthorForm, setShowNewAuthorForm] = useState(false);
  const [authorCreating, setAuthorCreating] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserAuthorId, setCurrentUserAuthorId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { 
    authors, 
    loading: authorsLoading, 
    createAuthor,
    error: authorsError 
  } = useAuthors();

  const {
    form,
    handleChange,
    addBlock,
    updateBlock,
    removeBlock,
    setBlocks,
    setAuthor,
    setPublished,
    setCoverImage,
  } = useBlogForm();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (contentMode === "html" && form.content.length > 0) {
      const html = blocksToHtml(form.content);
      setHtmlContent(html);
    }
  }, [contentMode, form.content]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/blog");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/email/${firebaseUser.email}`
        );

        if (!res.ok) {
          router.replace("/blog");
          return;
        }

        const dbUser = await res.json();
        const userRole = dbUser.role?.toLowerCase();
        setCurrentUserRole(userRole);

        if (!["admin", "writer"].includes(userRole)) {
          router.replace("/blog");
          return;
        }

        // Set current user's author ID if they have one
        if (dbUser.author?._id) {
          setCurrentUserAuthorId(dbUser.author._id);
          
          // For non-admin users, automatically set author to themselves
          if (userRole !== 'admin') {
            setAuthor(dbUser.author._id);
          }
        } else if (userRole === 'writer') {
          // Writers must have an author profile
          setError("Your account doesn't have an author profile. Please contact an admin.");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.replace("/blog");
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, setAuthor]);

  const handleCreateAuthor = async (authorData: any) => {
    setAuthorCreating(true);
    setError(null);
    try {
      const newAuthor = await createAuthor(authorData);
      setAuthor(newAuthor._id);
      setShowNewAuthorForm(false);
    } catch (err: any) {
      setError(err.message || "Failed to create author");
    } finally {
      setAuthorCreating(false);
    }
  };

  const handleCoverImageUpload = (url: string) => {
    setCoverImage(url);
  };

  const convertToBlocks = () => {
    try {
      const blocks = htmlToBlocksConverter(htmlContent);
      setBlocks(blocks);
      setContentMode("blocks");
      setError(null);
    } catch (err) {
      setError("Failed to convert HTML to blocks. Please check your HTML syntax.");
    }
  };

  const loadExampleHtml = () => {
    setHtmlContent(EXAMPLE_HTML);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.title) throw new Error("Title is required");
      if (!form.slug) throw new Error("Slug is required");
      if (!form.author) throw new Error("Please select an author");
      if (form.content.length === 0) throw new Error("Please add at least one content block");

      let contentToSave = form.content;
      if (contentMode === "html") {
        contentToSave = htmlToBlocksConverter(htmlContent);
      }

      const publishedAt = form.published ? new Date().toISOString() : null;

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || undefined,
        content: contentToSave.map(({ id, ...block }) => block),
        author: form.author,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        published: form.published,
        publishedAt: publishedAt || undefined,
        coverImage: form.coverImage || undefined,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(async () => ({ message: await res.text() }));
        throw new Error(errorData.message || "Failed to create blog");
      }

      const createdBlog = await res.json();
      router.push(`/blog/${createdBlog.slug}`);
    } catch (err: any) {
      setError(err.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#000213] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a50044] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Combine errors from different sources
  const displayError = error || authorsError;

  return (
    <div className="min-h-screen bg-white dark:bg-[#000213] transition-colors duration-300">
      {showNewAuthorForm && (
        <NewAuthorForm
          onSubmit={handleCreateAuthor}
          onCancel={() => setShowNewAuthorForm(false)}
          loading={authorCreating}
        />
      )}

      <StickyHeader
        scrolled={scrolled}
        viewMode={viewMode}
        contentMode={contentMode}
        onViewModeChange={setViewMode}
        onContentModeChange={setContentMode}
      />

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <BlogInfoCard
          form={form}
          authors={authors}
          authorsLoading={authorsLoading}
          onShowNewAuthorForm={() => setShowNewAuthorForm(true)}
          onChange={handleChange}
          onAuthorChange={setAuthor}
          onPublishedChange={setPublished}
          onCoverImageUpload={handleCoverImageUpload}
          currentUserRole={currentUserRole}
          currentUserAuthorId={currentUserAuthorId}
        />

        <ContentEditor
          contentMode={contentMode}
          viewMode={viewMode}
          blocks={form.content}
          htmlContent={htmlContent}
          onAddBlock={addBlock}
          onUpdateBlock={updateBlock}
          onRemoveBlock={removeBlock}
          onHtmlChange={setHtmlContent}
          onLoadExample={loadExampleHtml}
          onConvertToBlocks={convertToBlocks}
        />

        {displayError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{displayError}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-800">
          <button
            type="submit"
            disabled={
              loading ||
              !form.author ||
              !form.title ||
              !form.slug ||
              form.content.length === 0
            }
            className="flex-1 sm:flex-inline inline-flex items-center justify-center gap-2 rounded-xl bg-[#a50044] px-8 py-4 text-white hover:bg-[#8a0038] disabled:opacity-60 disabled:cursor-not-allowed font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {form.published ? "Publishing..." : "Saving..."}
              </>
            ) : (
              <>
                {form.published ? <Send className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                {form.published ? "Publish Blog Post" : "Save as Draft"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}