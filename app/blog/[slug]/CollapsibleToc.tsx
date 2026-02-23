/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/[slug]/CollapsibleToc.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TableOfContents } from './Toc';

interface CollapsibleTocProps {
  content: any[];
}

export function CollapsibleToc({ content }: CollapsibleTocProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Get the actual scroll height of the content
      const height = contentRef.current.scrollHeight;
      setMaxHeight(`${height}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <div className="rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
            Contents
          </h3>
          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
            Jump to section
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div 
        style={{ maxHeight }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div 
          ref={contentRef}
          className="p-4 border-t-2 border-gray-200 dark:border-gray-800"
        >
          <TableOfContents content={content} />
        </div>
      </div>
    </div>
  );
}