/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { Grid3x3, List, SlidersHorizontal, PenLine } from 'lucide-react';
import { ViewMode } from '../types/blog.types';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface BlogHeaderProps {
  scrolled: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onToggleFilters: () => void;
}

export default function BlogHeader({ 
  scrolled, 
  viewMode, 
  onViewModeChange, 
  onToggleFilters 
}: BlogHeaderProps) {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    console.log("🚀 BlogHeader mounted");

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("🔥 Firebase auth state changed");
      console.log("Current Firebase user:", currentUser);

      setUser(currentUser);

      if (currentUser) {
        console.log("✅ User is logged in");

        const storedUser = localStorage.getItem('user');
        console.log("📦 Raw localStorage user:", storedUser);

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            console.log("🧠 Parsed localStorage user:", userData);
            console.log("🎭 Extracted role:", userData.role);

            setUserRole(userData.role);
          } catch (error) {
            console.error("❌ Failed to parse localStorage user:", error);
            setUserRole(null);
          }
        } else {
          console.warn("⚠️ No 'user' found in localStorage");
          setUserRole(null);
        }
      } else {
        console.log("🚫 No Firebase user logged in");
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Debug role logic
  const canWritePost = userRole === 'writer' || userRole === 'admin';

  useEffect(() => {
    console.log("🔎 Role Debug Info:");
    console.log("Current userRole:", userRole);
    console.log("Is writer?", userRole === 'writer');
    console.log("Is admin?", userRole === 'admin');
    console.log("✅ canWritePost =", canWritePost);
  }, [userRole, canWritePost]);

  return (
    <div className={`sticky md:top-20 z-30 transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-xl bg-white/80 dark:bg-[#000213]/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/blog" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#a50044] to-[#8a0038] flex items-center justify-center">
              <PenLine className="w-4 h-4 text-white" />
            </div>

            <span className="font-bold text-xl bg-[#004d98] bg-clip-text text-transparent">
              THE LAAMI LABS BLOG
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-[#a50044] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-[#a50044] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onToggleFilters}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Desktop Write Button */}
            {canWritePost && (
              <>
                {console.log("🖥 Rendering desktop Write Post button")}
                <Link
                  href="/blog/add"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#a50044] to-[#8a0038] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <PenLine className="w-4 h-4" />
                  Write Post
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Write Button */}
        {canWritePost && (
          <>
            {console.log("📱 Rendering mobile Write Post button")}
            <div className="md:hidden flex justify-end pb-2">
              <Link
                href="/blog/add"
                className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#a50044] to-[#8a0038] text-white rounded-lg text-sm font-medium shadow-lg"
              >
                <PenLine className="w-4 h-4" />
                Write Post
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
