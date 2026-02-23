/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sparkles, Send, Upload, X, User } from "lucide-react";
import { CreateBlogForm } from "../types";
import AuthorSelector from "./AuthorSelector";
import { useRef, useState, useEffect } from "react";

interface BlogInfoCardProps {
  form: CreateBlogForm;
  authors: any[];
  authorsLoading: boolean;
  onShowNewAuthorForm: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onAuthorChange: (authorId: string) => void;
  onPublishedChange: (published: boolean) => void;
  onCoverImageUpload?: (url: string) => void;
  currentUserRole: string | null;
  currentUserAuthorId: string | null;
}

export default function BlogInfoCard({
  form,
  authors,
  authorsLoading,
  onShowNewAuthorForm,
  onChange,
  onAuthorChange,
  onPublishedChange,
  onCoverImageUpload,
  currentUserRole,
  currentUserAuthorId,
}: BlogInfoCardProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isAdmin = currentUserRole === 'admin';

  // Find current user's author info for display
  const currentUserAuthor = authors.find(a => a._id === currentUserAuthorId);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_BLOG_UPLOAD_PRESET!,
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_BLOG_CLOUD_NAME!,
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_BLOG_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (onCoverImageUpload) {
          onCoverImageUpload(data.secure_url);
        } else {
          const syntheticEvent = {
            target: {
              name: "coverImage",
              value: data.secure_url,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      } else {
        setUploadError("Failed to upload image");
      }
    } catch (error) {
      setUploadError("Error uploading image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const clearCoverImage = () => {
    const syntheticEvent = {
      target: {
        name: "coverImage",
        value: "",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-bold text-xl bg-[#004d98] bg-clip-text text-transparent">
          THE LAAMI LABS BLOG
        </h2>
        {!isAdmin && currentUserAuthor && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
            <User className="w-4 h-4" />
            Writing as: {currentUserAuthor.name}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors text-lg font-medium"
            placeholder="My Amazing Blog Post"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Slug *
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={onChange}
            className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors font-mono text-sm"
            placeholder="my-amazing-blog-post"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Cover Image
          </label>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg hover:border-[#a50044] disabled:opacity-60 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {uploading ? "Uploading..." : "Upload Image"}
                </span>
              </button>
            </div>

            {uploadError && (
              <p className="text-sm text-red-500">{uploadError}</p>
            )}

            {form.coverImage ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="w-10 h-10 rounded object-cover"
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                  {form.coverImage}
                </span>
                <button
                  type="button"
                  onClick={clearCoverImage}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <input
                name="coverImage"
                value={form.coverImage || ""}
                onChange={onChange}
                placeholder="Or enter URL manually"
                className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors text-sm"
              />
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Upload an image or enter a URL
          </p>
        </div>

        <div>
          {authorsLoading ? (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Author *
              </label>
              <div className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 animate-pulse">
                Loading authors...
              </div>
            </div>
          ) : (
            <AuthorSelector
              authors={authors}
              selectedAuthor={form.author}
              onSelectAuthor={onAuthorChange}
              onCreateNewAuthor={onShowNewAuthorForm}
              isAdmin={isAdmin}
              currentUserAuthorId={currentUserAuthorId}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Tags
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={onChange}
            className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors text-sm"
            placeholder="react, nextjs, typescript"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Separate tags with commas
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt || ""}
            onChange={onChange}
            rows={3}
            className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors"
            placeholder="Brief description of your blog post..."
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => onPublishedChange(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-[#a50044] focus:ring-[#a50044] focus:ring-offset-0"
          />
          <label
            htmlFor="published"
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Publish immediately
          </label>
        </div>
      </div>
    </div>
  );
}