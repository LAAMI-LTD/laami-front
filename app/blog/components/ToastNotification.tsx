'use client';

import { Check, X, Share2 } from 'lucide-react';
import { ToastState } from '../types/blog.types';

interface ToastNotificationProps {
  toast: ToastState;
}

export default function ToastNotification({ toast }: ToastNotificationProps) {
  if (!toast.show) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 animate-slideIn"
      role="alert"
      aria-live="polite"
    >
      <div className={`
        flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl border
        ${toast.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' : ''}
        ${toast.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300' : ''}
        ${toast.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300' : ''}
      `}>
        {toast.type === 'success' && <Check className="w-5 h-5" />}
        {toast.type === 'error' && <X className="w-5 h-5" />}
        {toast.type === 'info' && <Share2 className="w-5 h-5" />}
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
}