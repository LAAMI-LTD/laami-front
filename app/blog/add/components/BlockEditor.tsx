/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  GripVertical,
  Trash2,
  Plus,
  X,
  Type,
  Image as ImageIcon,
  Terminal,
  Quote,
  List,
  FileCode,
  Upload,
  Link,
} from "lucide-react";
import { ContentBlock } from "../types";
import { BLOCK_ICONS } from "../constants";
import { useRef, useState } from "react";

interface BlockEditorProps {
  blocks: ContentBlock[];
  onAddBlock: (type: ContentBlock["type"]) => void;
  onUpdateBlock: (index: number, field: string, value: any) => void;
  onRemoveBlock: (index: number) => void;
}

export default function BlockEditor({
  blocks,
  onAddBlock,
  onUpdateBlock,
  onRemoveBlock,
}: BlockEditorProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleImageUpload = async (index: number, file: File) => {
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

    setUploadingIndex(index);
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
        onUpdateBlock(index, "data.url", data.secure_url);
        // Auto-generate alt text from filename if not set
        const block = blocks[index];
        if (!block.data.alt) {
          const fileName = file.name.split(".")[0].replace(/[-_]/g, " ");
          onUpdateBlock(index, "data.alt", fileName);
        }
      } else {
        setUploadError("Failed to upload image");
      }
    } catch (error) {
      setUploadError("Error uploading image");
      console.error("Upload error:", error);
    } finally {
      setUploadingIndex(null);
      // Clear the file input
      if (fileInputRefs.current[`image-${index}`]) {
        fileInputRefs.current[`image-${index}`]!.value = "";
      }
    }
  };

  const triggerFileUpload = (index: number) => {
    fileInputRefs.current[`image-${index}`]?.click();
  };

  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-xl mb-4">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {uploadError}
          </p>
        </div>
      )}

      {blocks.map((block, index) => {
        const Icon = BLOCK_ICONS[block.type];

        return (
          <div
            key={block.id}
            className="group relative border-2 border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 hover:border-[#a50044] dark:hover:border-[#a50044] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#a50044]/10 text-[#a50044]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={block.order || index}
                    onChange={(e) =>
                      onUpdateBlock(index, "order", parseInt(e.target.value))
                    }
                    className="w-12 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none"
                    min="0"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveBlock(index)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 transition-colors"
                  aria-label="Remove block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {block.type === "paragraph" && (
                <textarea
                  value={block.data.text}
                  onChange={(e) =>
                    onUpdateBlock(index, "data.text", e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors"
                  placeholder="Enter paragraph text..."
                />
              )}

              {block.type === "heading" && (
                <div className="space-y-3">
                  <select
                    value={block.data.level}
                    onChange={(e) =>
                      onUpdateBlock(
                        index,
                        "data.level",
                        parseInt(e.target.value),
                      )
                    }
                    className="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((level) => (
                      <option key={level} value={level}>
                        Heading {level}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={block.data.text}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.text", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Heading text..."
                  />
                </div>
              )}

              {block.type === "image" && (
                <div className="space-y-3">
                  {/* Cloudinary Upload Section */}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={(el) => {
                        fileInputRefs.current[`image-${index}`] = el;
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(index, file);
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => triggerFileUpload(index)}
                      disabled={uploadingIndex === index}
                      className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg hover:border-[#a50044] disabled:opacity-60 transition-colors flex-1"
                    >
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {uploadingIndex === index
                          ? "Uploading..."
                          : "Upload Image"}
                      </span>
                    </button>
                  </div>

                  {/* Image Preview */}
                  {block.data.url && (
                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                      <img
                        src={block.data.url}
                        alt={block.data.alt || "Blog image"}
                        className="w-full max-h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => onUpdateBlock(index, "data.url", "")}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}

                  {/* URL Input */}
                  <input
                    type="text"
                    value={block.data.url || ""}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.url", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Or enter image URL manually..."
                  />

                  <input
                    type="text"
                    value={block.data.caption || ""}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.caption", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Caption (optional)..."
                  />
                  <input
                    type="text"
                    value={block.data.alt || ""}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.alt", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Alt text..."
                  />
                </div>
              )}

              {block.type === "code" && (
                <div className="space-y-3">
                  <select
                    value={block.data.language}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.language", e.target.value)
                    }
                    className="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="bash">Bash</option>
                    <option value="json">JSON</option>
                  </select>
                  <textarea
                    value={block.data.code}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.code", e.target.value)
                    }
                    rows={6}
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-900 px-4 py-3 font-mono text-sm text-green-400 focus:border-[#a50044] focus:outline-none"
                    placeholder="Enter code..."
                  />
                </div>
              )}

              {block.type === "quote" && (
                <div className="space-y-3">
                  <textarea
                    value={block.data.text}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.text", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Quote text..."
                  />
                  <input
                    type="text"
                    value={block.data.author}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.author", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Author (optional)..."
                  />
                </div>
              )}

              {block.type === "list" && (
                <div className="space-y-3">
                  <select
                    value={block.data.style}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.style", e.target.value)
                    }
                    className="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                  >
                    <option value="unordered">Unordered</option>
                    <option value="ordered">Ordered</option>
                  </select>

                  {block.data.items?.map((item: string, itemIndex: number) => (
                    <div key={itemIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...block.data.items];
                          newItems[itemIndex] = e.target.value;
                          onUpdateBlock(index, "data.items", newItems);
                        }}
                        className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                        placeholder={`Item ${itemIndex + 1}...`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = block.data.items.filter(
                            (_: any, i: number) => i !== itemIndex,
                          );
                          onUpdateBlock(index, "data.items", newItems);
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...(block.data.items || []), ""];
                      onUpdateBlock(index, "data.items", newItems);
                    }}
                    className="flex items-center gap-2 text-sm text-[#a50044] hover:text-[#8a0038] font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add item
                  </button>
                </div>
              )}

              {block.type === "embed" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={block.data.provider}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.provider", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Provider (youtube, vimeo, etc)..."
                  />
                  <input
                    type="text"
                    value={block.data.url}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.url", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Embed URL..."
                  />
                </div>
              )}
              {block.type === "link" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={block.data.text || ""}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.text", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="Link text..."
                  />
                  <input
                    type="url"
                    value={block.data.url || ""}
                    onChange={(e) =>
                      onUpdateBlock(index, "data.url", e.target.value)
                    }
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none"
                    placeholder="https://example.com"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={block.data.target === "_blank"}
                        onChange={(e) =>
                          onUpdateBlock(
                            index,
                            "data.target",
                            e.target.checked ? "_blank" : "_self",
                          )
                        }
                        className="rounded border-gray-300 text-[#a50044] focus:ring-[#a50044]"
                      />
                      Open in new tab
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Add a block:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { type: "paragraph", icon: Type, label: "Paragraph" },
            { type: "heading", icon: Type, label: "Heading" },
            { type: "image", icon: ImageIcon, label: "Image" },
            { type: "code", icon: Terminal, label: "Code" },
            { type: "quote", icon: Quote, label: "Quote" },
            { type: "list", icon: List, label: "List" },
            { type: "embed", icon: FileCode, label: "Embed" },
            { type: "link", icon: Link, label: "Link" },
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => onAddBlock(type as ContentBlock["type"])}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#a50044] dark:hover:border-[#a50044] bg-white dark:bg-gray-900 transition-all duration-300 group"
            >
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#a50044]" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#a50044]">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
