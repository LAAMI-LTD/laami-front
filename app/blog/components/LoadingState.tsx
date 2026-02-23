'use client';

import Image from 'next/image';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000213] flex items-center justify-center">
      <div className="text-center">
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes pulse-glow-color {
            0% { background-color: #a50044; transform: scale(1); opacity: 0.3; }
            50% { background-color: #004d98; transform: scale(1.1); opacity: 0.6; }
            100% { background-color: #a50044; transform: scale(1); opacity: 0.3; }
          }

          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-pulse-glow-color {
            animation: pulse-glow-color 2s ease-in-out infinite;
          }

          .animate-shimmer {
            animation: shimmer 3s linear infinite;
          }
        `}</style>

        <div className="relative w-44 h-44 mx-auto mb-6">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full blur-2xl animate-pulse-glow-color"></div>

          {/* Middle ring */}
          <div className="absolute inset-2 bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 rounded-full blur-lg opacity-30 dark:opacity-40 animate-ping"></div>

          {/* Logo container */}
          <div className="relative w-full h-full animate-float">
            <Image
              src="/laami.png"
              alt="Laami"
              width={96}
              height={96}
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(165,0,68,0.5)]"
              priority
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-gray-700 dark:text-gray-200 font-semibold text-lg animate-pulse">
            Paukwa ...
          </p>
        </div>
      </div>
    </div>
  );
}
