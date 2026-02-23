// lib/utils.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate read time based on content blocks
 */
export function calculateReadTime(content: any[]): number {
  // Average reading speed: 200 words per minute
  const WORDS_PER_MINUTE = 200;
  
  let wordCount = 0;
  
  content.forEach((block) => {
    if (block.type === 'paragraph' || block.type === 'quote') {
      wordCount += block.data.text.split(/\s+/).length;
    } else if (block.type === 'heading') {
      wordCount += block.data.text.split(/\s+/).length;
    } else if (block.type === 'list') {
      block.data.items.forEach((item: string) => {
        wordCount += item.split(/\s+/).length;
      });
    } else if (block.type === 'code') {
      // Code blocks are counted differently
      wordCount += block.data.code.split(/\n/).length * 2;
    }
  });
  
  const readTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, length: number = 150): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Check if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}