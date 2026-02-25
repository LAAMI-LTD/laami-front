"use client";

import { useState } from "react";
import { Link2, Check, Mail, Share2, X } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  showLabels?: boolean;
  variant?: "compact" | "full" | "minimal";
  className?: string;
}

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.265c-.146.658-.537.818-1.084.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.2-.658-.643.135-.953l11.57-4.458c.538-.196 1.006.128.832.941z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function ShareButtons({
  url,
  title,
  description,
  image,
  showLabels = false,
  variant = "compact",
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);
  const whatsappText = `${title}\n\n${description || ""}\n\n${url}`;
  const telegramText = `${title} - ${description || ""}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=laamilabs`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(telegramText)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description || title, url });
        setIsOpen(false);
      } catch (err) {
        console.log("Share cancelled:", err);
      }
    }
  };

  const showNativeShare =
    typeof navigator !== "undefined" && "share" in navigator;

  interface PlatformButton {
    name: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    href: string;
    color: string;
    darkColor?: string;
  }

  const buttons: PlatformButton[] = [
    {
      name: "X",
      label: "Share on X",
      icon: XIcon,
      href: shareLinks.twitter,
      color: "#000000",
      darkColor: "#ffffff",
    },
    {
      name: "Facebook",
      label: "Share on Facebook",
      icon: FacebookIcon,
      href: shareLinks.facebook,
      color: "#1877F2",
    },
    {
      name: "LinkedIn",
      label: "Share on LinkedIn",
      icon: LinkedInIcon,
      href: shareLinks.linkedin,
      color: "#0A66C2",
    },
    {
      name: "WhatsApp",
      label: "Share on WhatsApp",
      icon: WhatsAppIcon,
      href: shareLinks.whatsapp,
      color: "#25D366",
    },
    {
      name: "Telegram",
      label: "Share on Telegram",
      icon: TelegramIcon,
      href: shareLinks.telegram,
      color: "#229ED9",
    },
    {
      name: "Email",
      label: "Share via Email",
      icon: Mail,
      href: shareLinks.email,
      color: "#6B7280",
      darkColor: "#9CA3AF",
    },
  ];

  // ─── Minimal variant ─────────────────────────────────────────────────────────
  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {buttons.slice(0, 4).map((btn) => (
          <a
            key={btn.name}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={btn.label}
            title={btn.label}
            className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-transparent border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-150"
          >
            <btn.icon
              className="w-4 h-4 transition-colors duration-150"
              style={
                {
                  color: btn.darkColor ? btn.color : btn.color,
                  "@media (prefers-color-scheme: dark)": {
                    color: btn.darkColor || btn.color,
                  },
                } as React.CSSProperties
              }
            />
          </a>
        ))}

        <button
          onClick={handleCopyLink}
          aria-label="Copy link"
          title={copied ? "Copied!" : "Copy link"}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-150"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Link2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>
    );
  }

  // ─── Full variant (modern redesign) ─────────────────────────────────────────────
  if (variant === "full") {
    return (
      <div className={`space-y-4 ${className}`}>
        {showLabels && (
          <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
            Share this article
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {buttons.map((btn) => (
            <a
              key={btn.name}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={btn.label}
              className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 hover:border-transparent hover:shadow-lg transition-all duration-200 overflow-hidden"
              style={
                {
                  "--btn-color": btn.color,
                  "--btn-dark-color": btn.darkColor || btn.color,
                } as React.CSSProperties
              }
            >
              {/* Hover background effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  backgroundColor: btn.color,
                }}
              />

              {/* Icon - with conditional dark mode color */}
              <btn.icon
                className="relative w-4 h-4 transition-colors duration-200 z-10"
                style={{
                  color: btn.color,
                }}
              />

              {/* Label - with proper dark mode handling via Tailwind */}
              <span className="relative text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-200 z-10">
                {btn.name}
              </span>
            </a>
          ))}

          <button
            onClick={handleCopyLink}
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 overflow-hidden ${
              copied
                ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10"
                : "border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50 hover:border-gray-400 dark:hover:border-white/20 hover:shadow-lg"
            }`}
          >
            {/* Hover effect for non-copied state */}
            {!copied && (
              <div className="absolute inset-0 bg-gray-900 dark:bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
            )}

            {copied ? (
              <Check className="relative w-4 h-4 text-emerald-500 dark:text-emerald-400 z-10" />
            ) : (
              <Link2 className="relative w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200 z-10" />
            )}

            <span
              className={`relative text-xs font-medium transition-colors duration-200 z-10 ${
                copied
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy link"}
            </span>
          </button>
        </div>

        {showNativeShare && (
          <button
            onClick={handleShare}
            className="sm:hidden flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 text-sm font-medium hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-white/10 transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
            More sharing options
          </button>
        )}
      </div>
    );
  }

  // ─── Compact variant (dropdown panel) ────────────────────────────────────────
  return (
    <div className={`relative ${className}`}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Share"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
          isOpen
            ? "border-gray-400 dark:border-white/30 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white"
            : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <Share2 className="w-4 h-4" />
        {showLabels && <span>Share</span>}
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-11 z-50 w-72">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.06]">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
                  Share
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 space-y-3">
                {/* OG Preview */}
                <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02]">
                  <div className="relative w-full aspect-[1200/630] bg-gradient-to-br from-[#8a0038] to-[#3d0019] dark:from-[#b00048] dark:to-[#4d0020]">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-white/10 dark:text-white/20 tracking-tight uppercase">
                          LAAMI
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] font-medium text-[#8a0038] dark:text-[#ff7a95] mb-0.5">
                      laamilabs.co.ke
                    </p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
                      {title}
                    </p>
                    {description && (
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Platform grid */}
                <div className="grid grid-cols-5 gap-1.5">
                  {buttons.slice(0, 5).map((btn) => (
                    <a
                      key={btn.name}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={btn.label}
                      onClick={() => setIsOpen(false)}
                      className="group flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity group-hover:opacity-90"
                        style={{ backgroundColor: btn.color }}
                      >
                        <btn.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 leading-none text-center">
                        {btn.name}
                      </span>
                    </a>
                  ))}
                </div>

                {/* URL copy bar */}
                <button
                  onClick={() => {
                    handleCopyLink();
                    setTimeout(() => setIsOpen(false), 600);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border transition-all duration-150 ${
                    copied
                      ? "border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5"
                      : "border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.15] bg-gray-50 dark:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Link2
                      className={`w-3.5 h-3.5 flex-shrink-0 ${copied ? "text-emerald-500" : "text-gray-400 dark:text-gray-500"}`}
                    />
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 truncate">
                      {url.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold tracking-wide flex-shrink-0 ${
                      copied
                        ? "text-emerald-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
