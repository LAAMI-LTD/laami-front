"use client";

import { useEffect, useState } from "react";

export default function FilterFloatingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Close on ESC (UX polish)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ================= FLOATING BUTTON ================= */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open filters"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full
        border border-white/15 bg-white/10 text-white backdrop-blur-xl shadow-xl
        transition hover:scale-105 hover:bg-pink-500/20"
      >
        {/* filter icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-8.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </button>

      {/* ================= OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 transition ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition"
        />

        {/* ================= PANEL ================= */}
        <div
          className={`absolute bottom-0 left-0 right-0 mx-auto w-full max-w-3xl
          rounded-t-[2.5rem] border border-white/10 bg-[#050816]
          p-6 shadow-2xl transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "translate-y-full"}`}
        >
          {/* drag indicator (mobile UX cue) */}
          <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-white/20" />

          {children}
        </div>
      </div>
    </>
  );
}
