/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AlertCircle } from "lucide-react";

interface DeleteConfirmationModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function DeleteConfirmationModal({ 
  title, 
  onConfirm, 
  onCancel, 
  loading 
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#000213] rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-400">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold">Delete Blog Post</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Are you sure you want to delete:
        </p>
        <p className="font-semibold text-lg mb-6 text-gray-900 dark:text-white">
          &quot;{title}&quot;
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          This action cannot be undone. The blog post will be permanently removed.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}