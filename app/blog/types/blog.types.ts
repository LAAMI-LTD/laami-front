/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Author {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface ContentBlock {
  type: string;
  data: any;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  author: Author;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  blogs: Blog[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PaginationState {
  page: number;
  total: number;
  totalPages: number;
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'newest' | 'oldest' | 'title';
export type ToastType = 'success' | 'error' | 'info';

export interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

export interface FilterState {
  searchTerm: string;
  selectedTag: string | null;
  sortBy: SortBy;
}