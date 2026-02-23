'use client';

import { Share2 } from 'lucide-react';

interface BlogStatsBarProps {
  totalFiltered: number;
  totalAll: number;
  onShareClick: () => void;
}

export default function BlogStatsBar({ totalFiltered, totalAll, onShareClick }: BlogStatsBarProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {totalFiltered}
            </span>{' '}
            of{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {totalAll}
            </span>{' '}
            articles
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onShareClick}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#a50044] dark:hover:text-[#ff6b9d] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}