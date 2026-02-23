/* eslint-disable @typescript-eslint/no-explicit-any */
// components/BlockPreview.tsx
import React from 'react';
import { ContentBlock } from '../types';

interface BlockPreviewProps {
  blocks: ContentBlock[];
  showEmptyState?: boolean;
}

// Helper component for headings
const HeadingComponent = ({ level, children, className }: { 
  level: number; 
  children: React.ReactNode;
  className?: string;
}) => {
  const baseStyles = "font-bold text-gray-900 dark:text-gray-100";
  const combinedClassName = `${baseStyles} ${className || ''}`;
  
  if (level === 1) return <h1 className={`text-4xl mt-10 mb-6 ${combinedClassName}`}>{children}</h1>;
  if (level === 2) return <h2 className={`text-3xl mt-8 mb-4 ${combinedClassName}`}>{children}</h2>;
  if (level === 3) return <h3 className={`text-2xl mt-6 mb-3 ${combinedClassName}`}>{children}</h3>;
  if (level === 4) return <h4 className={`text-xl mt-5 mb-2 ${combinedClassName}`}>{children}</h4>;
  if (level === 5) return <h5 className={`text-lg mt-4 mb-2 ${combinedClassName}`}>{children}</h5>;
  return <h6 className={`text-base mt-3 mb-2 ${combinedClassName}`}>{children}</h6>;
};

// Language badge for code blocks
const LanguageBadge = ({ language }: { language: string }) => {
  const colors: Record<string, string> = {
    javascript: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    typescript: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    python: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    java: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    html: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    css: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    bash: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300',
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
  };
  
  const colorClass = colors[language] || colors.default;
  
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${colorClass}`}>
      {language.toUpperCase()}
    </span>
  );
};

export default function BlockPreview({ blocks, showEmptyState = true }: BlockPreviewProps) {
  if (blocks.length === 0 && showEmptyState) {
    return (
      <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center bg-white dark:bg-gray-900">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No content yet</h3>
        <p className="text-gray-500 dark:text-gray-500 max-w-sm mx-auto">
          Start adding content blocks to see how your blog post will look to readers
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-serif dark:bg-gray-900">
      {blocks.map((block) => (
        <div key={block.id} className="transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 rounded-lg p-2 -m-2">
          {block.type === 'paragraph' && (
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-lg">
              {block.data.text || (
                <span className="text-gray-400 dark:text-gray-600 italic">Empty paragraph - your text will appear here</span>
              )}
            </p>
          )}
          
          {block.type === 'heading' && (
            <HeadingComponent 
              level={Math.min(block.data.level || 2, 6)}
            >
              {block.data.text || (
                <span className="text-gray-400 dark:text-gray-600 italic">Untitled heading</span>
              )}
            </HeadingComponent>
          )}
          
          {block.type === 'image' && (
            <figure className="my-8">
              {block.data.url ? (
                <div className="relative overflow-hidden rounded-xl shadow-lg dark:shadow-gray-900">
                  <img 
                    src={block.data.url} 
                    alt={block.data.caption || 'Blog image'}
                    className="w-full h-auto max-h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/800x400/3b82f6/ffffff?text=Image+Not+Found&font=montserrat';
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
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">Image preview will appear here</span>
                </div>
              )}
            </figure>
          )}
          
          {block.type === 'code' && (
            <div className="my-8 overflow-hidden rounded-xl shadow-lg dark:shadow-gray-900">
              <div className="flex justify-between items-center bg-gray-900 dark:bg-black text-gray-200 dark:text-gray-300 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <LanguageBadge language={block.data.language || 'text'} />
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <pre className="bg-gray-950 dark:bg-black text-gray-100 dark:text-gray-300 p-5 overflow-x-auto font-mono text-sm leading-relaxed">
                <code>{block.data.code || '// Your code will appear here'}</code>
              </pre>
            </div>
          )}
          
          {block.type === 'quote' && (
            <blockquote className="my-8 border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-2 italic bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent">
              <div className="relative">
                <svg className="absolute -top-4 -left-2 w-8 h-8 text-blue-200 dark:text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl text-gray-800 dark:text-gray-200 pl-4">
                  {block.data.text || (
                    <span className="text-gray-400 dark:text-gray-600">Inspirational quote will appear here</span>
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
          
          {block.type === 'list' && (
            <div className="my-6">
              {block.data.ordered ? (
                <ol className="space-y-3 pl-6">
                  {block.data.items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full flex items-center justify-center font-semibold mr-3 mt-1">
                        {index + 1}
                      </span>
                      <span className="text-gray-800 dark:text-gray-300 text-lg pt-1">
                        {item || <span className="text-gray-400 dark:text-gray-600 italic">List item</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="space-y-3 pl-6">
                  {block.data.items?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 w-6 h-6 text-blue-500 dark:text-blue-400 mr-3 mt-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-800 dark:text-gray-300 text-lg pt-1">
                        {item || <span className="text-gray-400 dark:text-gray-600 italic">List item</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {(!block.data.items || block.data.items.length === 0) && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
                  <p className="text-gray-500 dark:text-gray-400">No list items added yet</p>
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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