import { useState } from 'react';
import { Blog, SortBy, FilterState } from '../types/blog.types';

export function useBlogFilters(blogs: Blog[]) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedTag: null,
    sortBy: 'newest'
  });

  const filteredAndSortedBlogs = blogs
    .filter(blog => {
      if (filters.searchTerm === '') return true;
      
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt?.toLowerCase().includes(searchLower) ||
        blog.author.name.toLowerCase().includes(searchLower) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const updateSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };

  const updateSelectedTag = (tag: string | null) => {
    setFilters(prev => ({ ...prev, selectedTag: tag }));
  };

  const updateSortBy = (sortBy: SortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedTag: null,
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = filters.searchTerm !== '' || filters.selectedTag !== null;

  return {
    filters,
    filteredAndSortedBlogs,
    updateSearchTerm,
    updateSelectedTag,
    updateSortBy,
    clearFilters,
    hasActiveFilters
  };
}