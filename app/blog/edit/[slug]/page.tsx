/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AlertCircle, Save, Send, Trash2 } from "lucide-react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

import StickyHeader from "../../add/components/StickyHeader";
import BlogInfoCard from "../../add/components/BlogInfoCard";
import ContentEditor from "../../add/components/ContentEditor";
import NewAuthorForm from "../../add/components/NewAuthorForm";
import DeleteConfirmationModal from "../components/DeleteConfirmation";
import { ContentMode, ViewMode, ContentBlock } from "../../add/types";
import { useAuthors } from "../../add/hooks/useAuthors";
import { useBlogForm } from "../../add/hooks/useBlogForm";
import {
  blocksToHtml,
  htmlToBlocksConverter,
} from "../../add/utils/blockConverters";
import { EXAMPLE_HTML } from "../../add/constants";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentMode, setContentMode] = useState<ContentMode>("blocks");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [htmlContent, setHtmlContent] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showNewAuthorForm, setShowNewAuthorForm] = useState(false);
  const [authorCreating, setAuthorCreating] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserAuthorId, setCurrentUserAuthorId] = useState<string | null>(
    null,
  );
  const [authLoading, setAuthLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [blogFetched, setBlogFetched] = useState(false);

  const {
    authors,
    loading: authorsLoading,
    createAuthor,
    error: authorsError,
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
    setFormFromBlog,
    resetForm,
  } = useBlogForm();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update HTML when switching to HTML mode
  useEffect(() => {
    if (contentMode === "html" && form.content.length > 0) {
      const html = blocksToHtml(form.content);
      setHtmlContent(html);
    }
  }, [contentMode, form.content]);

  // Auth check - runs once
  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (!firebaseUser) {
        router.replace("/blog");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/email/${firebaseUser.email}`,
        );

        if (!res.ok) {
          router.replace("/blog");
          return;
        }

        const dbUser = await res.json();
        const userRole = dbUser.role?.toLowerCase();

        if (!mounted) return;
        setCurrentUserRole(userRole);

        if (!["admin", "writer"].includes(userRole)) {
          router.replace("/blog");
          return;
        }

        if (dbUser.author?._id) {
          setCurrentUserAuthorId(dbUser.author._id);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.replace("/blog");
      } finally {
        if (mounted) {
          setAuthLoading(false);
          setAuthChecked(true);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router]);

  // Fetch blog data - runs after auth is checked
  useEffect(() => {
    if (!authChecked || !slug || blogFetched) return;

    let mounted = true;

    const fetchBlog = async () => {
      try {
        setInitialLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/slug/${slug}`,
        );

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Blog post not found");
          }
          throw new Error("Failed to fetch blog post");
        }

        const blog = await res.json();

        if (!mounted) return;

        setBlogId(blog._id);

        // Transform content blocks to match the form's expected format
        const transformedContent = blog.content.map(
          (block: any, index: number) => {
            const id = block._id || Math.random().toString(36).substring(2, 9);

            let transformedData = { ...block.data };

            if (block.type === "image") {
              transformedData = {
                url: block.data.url || "",
                caption: block.data.caption || "",
                alt: block.data.alt || "",
              };
            } else if (block.type === "list") {
              transformedData = {
                style: block.data.style || "unordered",
                items: block.data.items || [],
              };
            } else if (block.type === "heading") {
              transformedData = {
                text: block.data.text || "",
                level: block.data.level || 1,
              };
            } else if (block.type === "quote") {
              transformedData = {
                text: block.data.text || "",
                author: block.data.author || "",
              };
            } else if (block.type === "code") {
              transformedData = {
                code: block.data.code || "",
                language: block.data.language || "javascript",
              };
            } else if (block.type === "embed") {
              transformedData = {
                provider: block.data.provider || "",
                url: block.data.url || "",
              };
            } else if (block.type === "paragraph") {
              transformedData = {
                text: block.data.text || "",
              };
            }

            return {
              id,
              type: block.type,
              order: block.order || index,
              data: transformedData,
            };
          },
        );

        // Set form data
        setFormFromBlog({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt || "",
          content: transformedContent,
          author: blog.author?._id || blog.author,
          tags: blog.tags?.join(", ") || "",
          published: blog.published || false,
          coverImage: blog.coverImage || "",
          publishedAt: blog.publishedAt,
        });

        // Set HTML content for HTML mode
        if (blog.content) {
          const html = blocksToHtml(blog.content);
          setHtmlContent(html);
        }

        setBlogFetched(true);
      } catch (err: any) {
        console.error("Error fetching blog:", err);
        if (mounted) {
          setError(err.message || "Failed to load blog post");
          setTimeout(() => router.push("/blog"), 3000);
        }
      } finally {
        if (mounted) {
          setInitialLoading(false);
        }
      }
    };

    fetchBlog();

    return () => {
      mounted = false;
    };
  }, [slug, authChecked, blogFetched, router, setFormFromBlog]);

  // Permission check after both auth and blog are loaded
  useEffect(() => {
    if (
      !authChecked ||
      !blogFetched ||
      !currentUserRole ||
      !currentUserAuthorId ||
      !blogId
    )
      return;

    // Check if user has permission to edit this blog
    const checkPermission = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          const blog = await res.json();
          const isAuthor =
            blog.author?._id === currentUserAuthorId ||
            blog.author === currentUserAuthorId;
          const isAdmin = currentUserRole === "admin";

          if (!isAdmin && !isAuthor) {
            setError("You don't have permission to edit this blog post");
            setTimeout(() => router.push("/blog"), 3000);
          }
        }
      } catch (error) {
        console.error("Permission check error:", error);
      }
    };

    checkPermission();
  }, [
    authChecked,
    blogFetched,
    currentUserRole,
    currentUserAuthorId,
    blogId,
    router,
  ]);

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
      setError(
        "Failed to convert HTML to blocks. Please check your HTML syntax.",
      );
    }
  };

  const loadExampleHtml = () => {
    setHtmlContent(EXAMPLE_HTML);
  };

  const handleDelete = async () => {
    if (!blogId) return;

    setDeleteLoading(true);
    setError(null);

    try {
      const token = await auth.currentUser?.getIdToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete blog post");
      }

      router.push("/blog");
    } catch (err: any) {
      setError(err.message || "Failed to delete blog post");
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.title) throw new Error("Title is required");
      if (!form.slug) throw new Error("Slug is required");
      if (!form.author) throw new Error("Please select an author");
      if (form.content.length === 0)
        throw new Error("Please add at least one content block");

      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      let contentToSave = form.content;
      if (contentMode === "html") {
        contentToSave = htmlToBlocksConverter(htmlContent);
      }

      const apiContent = contentToSave.map(({ id, ...block }) => ({
        type: block.type,
        data: block.data,
        order: block.order,
      }));

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || undefined,
        content: apiContent,
        author: form.author,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        published: form.published,
        coverImage: form.coverImage || undefined,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        let message = "Failed to update blog";

        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch {
          message = await res.text();
        }

        throw new Error(message);
      }

      const updatedBlog = await res.json();
      router.push(`/blog/${updatedBlog.slug}`);
    } catch (err: any) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking auth and loading blog
  if (authLoading || initialLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#000213] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a50044] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {authLoading ? "Checking permissions..." : "Loading blog post..."}
          </p>
        </div>
      </div>
    );
  }

  // Combine errors from different sources
  const displayError = error || authorsError;
  const canDelete =
    currentUserRole === "admin" || currentUserAuthorId === form.author;

  return (
    <div className="min-h-screen bg-white dark:bg-[#000213] transition-colors duration-300">
      {showNewAuthorForm && (
        <NewAuthorForm
          onSubmit={handleCreateAuthor}
          onCancel={() => setShowNewAuthorForm(false)}
          loading={authorCreating}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          title={form.title || "this blog post"}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={deleteLoading}
        />
      )}

      <StickyHeader
        scrolled={scrolled}
        viewMode={viewMode}
        contentMode={contentMode}
        onViewModeChange={setViewMode}
        onContentModeChange={setContentMode}
        isEditing={true}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      >
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
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {displayError}
            </p>
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
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {form.published ? "Update Published Post" : "Update Draft"}
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

          {canDelete && (
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-8 py-4 border-2 border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
