/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus } from "lucide-react";

interface AuthorSelectorProps {
  authors: any[];
  selectedAuthor: string;
  onSelectAuthor: (authorId: string) => void;
  onCreateNewAuthor: () => void;
  isAdmin: boolean;
  currentUserAuthorId: string | null;
}

export default function AuthorSelector({
  authors,
  selectedAuthor,
  onSelectAuthor,
  onCreateNewAuthor,
  isAdmin,
  currentUserAuthorId,
}: AuthorSelectorProps) {
  // Filter and sort authors - put current user's author first if not admin
  const displayAuthors = isAdmin
    ? authors
    : authors.filter((a) => a._id === currentUserAuthorId);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectAuthor(e.target.value);
  };

  if (!isAdmin && displayAuthors.length === 0) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Author *
        </label>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            You don&apos;t have an author profile yet. Please contact an admin
            to create one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
        Author *
        {!isAdmin && (
          <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
            (You&apos;re writing as yourself)
          </span>
        )}
      </label>

      <div className="flex gap-2">
        <select
          value={selectedAuthor}
          onChange={handleAuthorChange}
          className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:border-[#a50044] focus:outline-none transition-colors"
          required
          disabled={!isAdmin && displayAuthors.length === 1} // Disable if only one option
        >
          <option value="">Select an author</option>
          {displayAuthors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.name}{" "}
              {author._id === currentUserAuthorId && !isAdmin ? "(You)" : ""}
            </option>
          ))}
        </select>

        {isAdmin && (
          <button
            type="button"
            onClick={onCreateNewAuthor}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#a50044] hover:text-[#a50044] transition-colors"
            title="Create new author"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {!isAdmin && displayAuthors.length === 1 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          You can only write as yourself. Contact an admin if you need to write
          as a different author.
        </p>
      )}
    </div>
  );
}
