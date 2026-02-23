// components/blog/AuthorCard.tsx - Minimalist Redesign

import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';

interface Author {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-shadow">
      <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-start sm:text-left">
        
        {/* Avatar */}
        <div className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {author.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {author.name}
          </h3>
          
          {author.bio && (
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {author.bio}
            </p>
          )}

          <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
            {/* <Link
              href={`/blog/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline underline-offset-2"
            >
              View all posts
            </Link> */}

            <div className="flex items-center gap-2">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
