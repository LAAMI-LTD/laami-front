'use client';

import { X, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  copied: boolean;
  onCopy: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>; // Allow null
}

export default function ShareMenu({ isOpen, onClose, copied, onCopy, menuRef }: ShareMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-slideUp"
    >
      {/* Rest of the component remains the same */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-[#a50044]/10 to-[#004d98]/10">
        <h4 className="font-semibold text-gray-900 dark:text-white">Share Blog</h4>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <button
          onClick={onCopy}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-left"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {copied ? 'Link copied!' : 'Copy link'}
          </span>
        </button>
                <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Twitter</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Facebook className="w-5 h-5 text-[#1877F2]" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Facebook</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
}