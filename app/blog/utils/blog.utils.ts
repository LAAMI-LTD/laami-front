import { ContentBlock, Blog } from '../types/blog.types';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getFirstParagraph(blog: Blog): string {
  const paragraph = blog.content?.find(block => block.type === 'paragraph');
  if (paragraph?.data?.text) {
    return paragraph.data.text.length > 120
      ? paragraph.data.text.substring(0, 120) + '...'
      : paragraph.data.text;
  }
  return blog.excerpt || 'No preview available';
}

export function getLongerParagraph(blog: Blog, maxLength: number = 1000): string {
  const paragraph = blog.content?.find(block => block.type === 'paragraph');
  if (paragraph?.data?.text) {
    return paragraph.data.text.length > maxLength
      ? paragraph.data.text.substring(0, maxLength) + '...'
      : paragraph.data.text;
  }
  return blog.excerpt || 'No content available';
}

export function calculateReadTime(content: ContentBlock[]): number {
  const text = content
    .filter(block => block.type === 'paragraph')
    .map(block => block.data?.text || '')
    .join(' ');
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function getAllTags(blogs: Blog[]): string[] {
  return Array.from(
    new Set(blogs.flatMap(blog => blog.tags || []))
  ).sort();
}