/* eslint-disable @next/next/no-img-element */
// components/blog/ShareButtons.tsx - Minimalist Redesign

'use client';

import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Link2, Check, Mail, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  showLabels?: boolean;
}

export function ShareButtons({ url, title, description, showLabels = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttons = [
    { name: 'Twitter', icon: Twitter, href: shareLinks.twitter, color: '#1DA1F2' },
    { name: 'Facebook', icon: Facebook, href: shareLinks.facebook, color: '#4267B2' },
    { name: 'LinkedIn', icon: Linkedin, href: shareLinks.linkedin, color: '#0077B5' },
    { name: 'Email', icon: Mail, href: shareLinks.email, color: '#6B7280' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      {showLabels && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
          <Share2 className="w-4 h-4" /> Share:
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {buttons.map((btn) => (
          <a
            key={btn.name}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: btn.color }}
            aria-label={`Share on ${btn.name}`}
          >
            <btn.icon className="w-5 h-5 text-white" />
          </a>
        ))}

        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 ${
            copied ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
          aria-label="Copy link"
        >
          {copied ? <Check className="w-5 h-5 text-white" /> : <Link2 className="w-5 h-5 text-white" />}
        </button>

        {showLabels && copied && (
          <span className="ml-2 text-sm font-medium text-green-500 dark:text-green-400">Copied!</span>
        )}
      </div>
    </div>
  );
}
