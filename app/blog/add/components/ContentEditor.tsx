/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FileCode } from "lucide-react";
import { ContentBlock, ContentMode, ViewMode } from "../types";
import BlockEditor from "./BlockEditor";
import HTMLContentEditor from "./HTMLContentEditor";
import BlockPreview from "./BlockPreview";

interface ContentEditorProps {
  contentMode: ContentMode;
  viewMode: ViewMode;
  blocks: ContentBlock[];
  htmlContent: string;
  onAddBlock: (type: ContentBlock["type"]) => void;
  onUpdateBlock: (index: number, field: string, value: any) => void;
  onRemoveBlock: (index: number) => void;
  onHtmlChange: (html: string) => void;
  onLoadExample: () => void;
  onConvertToBlocks: () => void;
}

export default function ContentEditor({
  contentMode,
  viewMode,
  blocks,
  htmlContent,
  onAddBlock,
  onUpdateBlock,
  onRemoveBlock,
  onHtmlChange,
  onLoadExample,
  onConvertToBlocks,
}: ContentEditorProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#004d98]/10">
            <FileCode className="w-5 h-5 text-[#004d98]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {contentMode === "blocks" ? "Content Blocks" : "HTML Editor"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {blocks.length} block{blocks.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className={`gap-6 ${viewMode === "split" ? "grid grid-cols-2" : ""}`}>
        {(viewMode === "editor" || viewMode === "split") && (
          <div>
            {contentMode === "html" ? (
              <HTMLContentEditor
                htmlContent={htmlContent}
                onHtmlChange={onHtmlChange}
                onLoadExample={onLoadExample}
                onConvertToBlocks={onConvertToBlocks}
              />
            ) : (
              <BlockEditor
                blocks={blocks}
                onAddBlock={onAddBlock}
                onUpdateBlock={onUpdateBlock}
                onRemoveBlock={onRemoveBlock}
              />
            )}
          </div>
        )}

        {(viewMode === "preview" || viewMode === "split") && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Live Preview
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                How readers will see it
              </span>
            </div>
            <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-gray-50 dark:bg-gray-800 min-h-[600px]">
              <BlockPreview blocks={blocks} showEmptyState={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}