// components/BlockPreview.tsx
import React from "react";
import { ContentBlock } from "../types";

interface BlockPreviewProps {
  blocks: ContentBlock[];
  showEmptyState?: boolean;
}

// Helper component for headings
const HeadingComponent = ({
  level,
  children,
  className,
}: {
  level: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const baseStyles = "font-bold text-gray-900 dark:text-gray-100";
  const combinedClassName = `${baseStyles} ${className || ""}`;

  if (level === 1)
    return (
      <h1 className={`text-4xl mt-10 mb-6 ${combinedClassName}`}>{children}</h1>
    );
  if (level === 2)
    return (
      <h2 className={`text-3xl mt-8 mb-4 ${combinedClassName}`}>{children}</h2>
    );
  if (level === 3)
    return (
      <h3 className={`text-2xl mt-6 mb-3 ${combinedClassName}`}>{children}</h3>
    );
  if (level === 4)
    return (
      <h4 className={`text-xl mt-5 mb-2 ${combinedClassName}`}>{children}</h4>
    );
  if (level === 5)
    return (
      <h5 className={`text-lg mt-4 mb-2 ${combinedClassName}`}>{children}</h5>
    );
  return (
    <h6 className={`text-base mt-3 mb-2 ${combinedClassName}`}>{children}</h6>
  );
};

// Language badge for code blocks
const LanguageBadge = ({ language }: { language: string }) => {
  const colors: Record<string, string> = {
    javascript:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    typescript:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    python:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    java: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    html: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
    css: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    bash: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
    default: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
  };

  const colorClass = colors[language] || colors.default;

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${colorClass}`}>
      {language.toUpperCase()}
    </span>
  );
};

export default function BlockPreview({
  blocks,
  showEmptyState = true,
}: BlockPreviewProps) {
  if (blocks.length === 0 && showEmptyState) {
    return (
      <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center bg-white dark:bg-gray-900">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          No content yet
        </h3>
        <p className="text-gray-500 dark:text-gray-500 max-w-sm mx-auto">
          Start adding content blocks to see how your blog post will look to
          readers
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-serif dark:bg-gray-900">
      {blocks.map((block) => (
        <div
          key={block.id}
          className="transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 rounded-lg p-2 -m-2"
        >
          {block.type === "paragraph" && (
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-lg">
              {block.data.text || (
                <span className="text-gray-400 dark:text-gray-600 italic">
                  Empty paragraph - your text will appear here
                </span>
              )}
            </p>
          )}

          {block.type === "heading" && (
            <HeadingComponent level={Math.min(block.data.level || 2, 6)}>
              {block.data.text || (
                <span className="text-gray-400 dark:text-gray-600 italic">
                  Untitled heading
                </span>
              )}
            </HeadingComponent>
          )}

          {block.type === "image" && (
            <figure className="my-8">
              {block.data.url ? (
                <div className="relative overflow-hidden rounded-xl shadow-lg dark:shadow-gray-900">
                  <img
                    src={block.data.url}
                    alt={block.data.caption || "Blog image"}
                    className="w-full h-auto max-h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://placehold.co/800x400/3b82f6/ffffff?text=Image+Not+Found&font=montserrat";
                    }}
                  />
                  {block.data.caption && (
                    <figcaption className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3 px-4">
                      {block.data.caption}
                    </figcaption>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">
                    Image preview will appear here
                  </span>
                </div>
              )}
            </figure>
          )}

          {block.type === "code" && (
            <div className="my-8 overflow-hidden rounded-xl shadow-lg dark:shadow-gray-900">
              <div className="flex justify-between items-center bg-gray-900 dark:bg-black text-gray-200 dark:text-gray-300 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <LanguageBadge language={block.data.language || "text"} />
                </div>
                <button
                  className="text-xs hover:bg-gray-800 dark:hover:bg-gray-900 px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 text-gray-300 dark:text-gray-400"
                  onClick={() => {
                    if (block.data.code) {
                      navigator.clipboard.writeText(block.data.code);
                      // You could add a toast notification here
                    }
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>
              </div>
              <pre className="bg-gray-950 dark:bg-black text-gray-100 dark:text-gray-300 p-5 overflow-x-auto font-mono text-sm leading-relaxed">
                <code>
                  {block.data.code || "// Your code will appear here"}
                </code>
              </pre>
            </div>
          )}

          {block.type === "quote" && (
            <blockquote className="my-8 border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-2 italic bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent">
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-2 w-8 h-8 text-blue-200 dark:text-blue-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl text-gray-800 dark:text-gray-200 pl-4">
                  {block.data.text || (
                    <span className="text-gray-400 dark:text-gray-600">
                      Inspirational quote will appear here
                    </span>
                  )}
                </p>
                {block.data.author && (
                  <footer className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4">
                    — {block.data.author}
                  </footer>
                )}
              </div>
            </blockquote>
          )}

          {block.type === "list" && (
            <div className="my-6">
              {block.data.ordered ? (
                <ol className="space-y-3 pl-6">
                  {block.data.items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full flex items-center justify-center font-semibold mr-3 mt-1">
                        {index + 1}
                      </span>
                      <span className="text-gray-800 dark:text-gray-300 text-lg pt-1">
                        {item || (
                          <span className="text-gray-400 dark:text-gray-600 italic">
                            List item
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="space-y-3 pl-6">
                  {block.data.items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-blue-500 dark:text-blue-400 mr-3 mt-1.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-800 dark:text-gray-300 text-lg pt-1">
                        {item || (
                          <span className="text-gray-400 dark:text-gray-600 italic">
                            List item
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {(!block.data.items || block.data.items.length === 0) && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
                  <p className="text-gray-500 dark:text-gray-400">
                    No list items added yet
                  </p>
                </div>
              )}
            </div>
          )}
          {block.type === "embed" && (
            <div className="my-8">
              {block.data.url ? (
                <div className="relative overflow-hidden rounded-xl shadow-lg dark:shadow-gray-900 bg-gray-100 dark:bg-gray-800">
                  {/* Provider badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1.5 bg-black/70 dark:bg-gray-900/90 text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1.5">
                      {block.data.provider === "youtube" && (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )}
                      {block.data.provider === "vimeo" && (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.916 3.834 7.675 3.014 7.675c-.179 0-.806.378-1.881 1.132L0 7.208c1.184-1.041 2.351-2.082 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.608-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                        </svg>
                      )}
                      {block.data.provider === "embed" && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      )}
                      <span className="capitalize">{block.data.provider}</span>
                    </span>
                  </div>

                  {/* Embed iframe or placeholder */}
                  <div className="aspect-video w-full">
                    {block.data.provider === "youtube" ? (
                      <iframe
                        src={block.data.url.replace("watch?v=", "embed/")}
                        className="w-full h-full"
                        allowFullScreen
                        title="YouTube video"
                      />
                    ) : block.data.provider === "vimeo" ? (
                      <iframe
                        src={block.data.url.replace(
                          "vimeo.com",
                          "player.vimeo.com/video",
                        )}
                        className="w-full h-full"
                        allowFullScreen
                        title="Vimeo video"
                      />
                    ) : (
                      <iframe
                        src={block.data.url}
                        className="w-full h-full"
                        allowFullScreen
                        title="Embedded content"
                      />
                    )}
                  </div>

                  {/* URL display for debugging/preview */}
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
                    {block.data.url}
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">
                    Embed preview will appear here
                  </span>
                  {block.data.provider && block.data.provider !== "embed" && (
                    <span className="mt-2 text-xs text-gray-400 dark:text-gray-500 capitalize">
                      Provider: {block.data.provider}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          {block.type === "link" && (
            <div className="my-4">
              <a
                href={block.data.url || "#"}
                target={block.data.target || "_self"}
                rel={
                  block.data.target === "_blank" ? "noopener noreferrer" : ""
                }
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-all duration-200 font-medium"
              >
                {block.data.text || (
                  <span className="text-gray-400 dark:text-gray-600 italic">
                    Empty link
                  </span>
                )}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </a>

              {/* Show URL info in preview for context */}
              {block.data.url && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded inline-block">
                  🔗 {block.data.url}
                  {block.data.target === "_blank" && " (opens in new tab)"}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Final blog post metadata summary */}
      {blocks.length > 0 && (
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Ready to publish
              </span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Preview mode
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
