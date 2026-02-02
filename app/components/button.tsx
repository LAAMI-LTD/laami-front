"use client";

import React from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  color = "#a50044",
  className = "",
  ariaLabel,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`
        group relative overflow-hidden
        px-6 py-3
        rounded-lg border
        font-medium
        transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        borderColor: color,
      }}
    >
      {/* Hover fill */}
      {!disabled && (
        <span
          className="
            absolute inset-0
            scale-x-0 origin-left
            transition-transform duration-500 ease-out
            group-hover:scale-x-100
          "
          style={{ backgroundColor: color }}
        />
      )}

      {/* Content */}
      <span
        className="
          relative z-10
          flex items-center gap-2
          transition-colors duration-300
          group-hover:text-white
        "
      >
        {children}
      </span>
    </button>
  );
}
