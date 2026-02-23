'use client';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#a50044] hover:bg-[#a50044]/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 dark:disabled:hover:border-gray-700 disabled:hover:bg-transparent transition-all font-medium text-gray-700 dark:text-gray-300"
        >
          Previous
        </button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = i + 1;
          } else if (currentPage <= 3) {
            pageNumber = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
          } else {
            pageNumber = currentPage - 2 + i;
          }
          
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-11 h-11 rounded-lg transition-all font-semibold ${
                currentPage === pageNumber
                  ? 'bg-gradient-to-r from-[#a50044] to-[#8a0038] text-white shadow-lg'
                  : 'border-2 border-gray-300 dark:border-gray-700 hover:border-[#a50044] hover:bg-[#a50044]/5 text-gray-700 dark:text-gray-300'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#a50044] hover:bg-[#a50044]/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 dark:disabled:hover:border-gray-700 disabled:hover:bg-transparent transition-all font-medium text-gray-700 dark:text-gray-300"
        >
          Next
        </button>
      </nav>
    </div>
  );
}