"use client";

import { useState, useRef } from "react";
import { X, User, Upload } from "lucide-react";
import { NewAuthorForm as NewAuthorFormType } from "../types";

interface NewAuthorFormProps {
  onSubmit: (author: NewAuthorFormType) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function NewAuthorForm({
  onSubmit,
  onCancel,
  loading,
}: NewAuthorFormProps) {
  const [form, setForm] = useState<NewAuthorFormType>({
    name: "",
    avatar: "",
    bio: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_BLOG_AUTHOR_PRESET!);
    formData.append("cloud_name", "dpn5rzjsf");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dpn5rzjsf/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        setForm({
          ...form,
          avatar: data.secure_url,
        });
      } else {
        setUploadError("Failed to upload image");
      }
    } catch (error) {
      setUploadError("Error uploading image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full border-2 border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Create New Author
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Avatar
            </label>

            {/* Cloudinary Upload Section */}
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

              {/* Preview or URL Input */}
              {form.avatar ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <img
                    src={form.avatar}
                    alt="Avatar preview"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                    {form.avatar}
                  </span>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, avatar: "" })}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ) : (
                <input
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                  placeholder="Or enter URL manually"
                  className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
              placeholder="Author biography..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#a50044] text-white py-3 rounded-lg hover:bg-[#8a0038] disabled:opacity-60 font-semibold transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Create Author
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border-2 border-gray-200 dark:border-gray-700 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}