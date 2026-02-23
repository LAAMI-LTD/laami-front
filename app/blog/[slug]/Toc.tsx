/* eslint-disable @typescript-eslint/no-explicit-any */
// components/blog/TableOfContents.tsx - REDESIGNED

"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";

interface ContentBlock {
  type: string;
  data: any;
}

interface TableOfContentsProps {
  content: ContentBlock[];
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const initialActiveSetRef = useRef<boolean>(false);

  // Derive headings from content
  const headings = useMemo<Heading[]>(() => {
    return content
      .filter((block) => block.type === "heading")
      .map((block) => ({
        id: block.data.text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        text: block.data.text,
        level: block.data.level,
      }));
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => {
            return (prev.boundingClientRect.top ?? 0) <
              (current.boundingClientRect.top ?? 0)
              ? prev
              : current;
          });
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0 || initialActiveSetRef.current) return;

    const timer = setTimeout(() => {
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 150) {
            setActiveId(heading.id);
            initialActiveSetRef.current = true;
            break;
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <ul className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const isEven = index % 2 === 0;
          const activeColor = isEven ? '#8a0038' : '#004d98';
          const activeColorClass = isEven 
            ? 'text-[#8a0038] dark:text-[#ff6b9d]' 
            : 'text-[#004d98] dark:text-[#6b9dff]';
          const borderColorClass = isEven
            ? 'border-[#8a0038] dark:border-[#ff6b9d]'
            : 'border-[#004d98] dark:border-[#6b9dff]';

          return (
            <li
              key={heading.id}
              style={{ marginLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <Link
                href={`#${heading.id}`}
                className={`block py-2 px-3 rounded-lg transition-all text-sm ${
                  isActive
                    ? `${activeColorClass} font-medium bg-gray-50 dark:bg-gray-800 border-l-4 ${borderColorClass}`
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {heading.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}