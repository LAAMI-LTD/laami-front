/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Share2, Check, Copy, Twitter, Facebook, Linkedin, Mail, Link as LinkIcon, X } from "lucide-react";
import Nav from "../components/nav";
import HeroShowcase from "./wokhero";
import TabContentWrapper from "./tabs/TabContentWrapper";
import Footer from "../components/footer";
import AnimatedButton from "../components/button";

export type TabId = "software" | "marketing" | "company";

const VALID_TABS: TabId[] = ["software", "marketing", "company"];

const TAB_LABELS: Record<TabId, string> = {
  software: "Software Development",
  marketing: "marketing",
  company: "Company Projects",
};

const getInitialTab = (): TabId => {
  if (typeof window === "undefined") return "software";

  const hash = window.location.hash.replace("#", "");
  return VALID_TABS.includes(hash as TabId) ? (hash as TabId) : "software";
};

const SOCIAL_SHARE_CONFIG = {
  twitter: {
    icon: Twitter,
    color: "#1DA1F2",
    label: "Twitter",
  },
  facebook: {
    icon: Facebook,
    color: "#1877F2",
    label: "Facebook",
  },
  linkedin: {
    icon: Linkedin,
    color: "#0A66C2",
    label: "LinkedIn",
  },
  email: {
    icon: Mail,
    color: "#EA4335",
    label: "Email",
  },
} as const;

type ToastType = "success" | "error" | "info";

export default function WorkPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: ToastType;
  }>({ show: false, message: "", type: "success" });
  const [shareCount, setShareCount] = useState(0);

  const shareMenuRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (VALID_TABS.includes(hash as TabId)) {
      setActiveTab(hash as TabId);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleHashChange]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.history.pushState(null, "", `#${tab}`);

    setTimeout(() => {
      const element = document.getElementById("tab-content");
      if (element) {
        const yOffset = -80; // Offset for sticky header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  // Generate the current page URL with hash
  const getCurrentUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/work#${activeTab}`;
  }, [activeTab]);

  // Copy link to clipboard with improved error handling
  const copyToClipboard = useCallback(async () => {
    try {
      const url = getCurrentUrl();
      
      // Fallback for older browsers
      if (!navigator.clipboard) {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand("copy");
          if (successful) {
            setCopied(true);
            showToast("Link copied to clipboard!", "success");
            setShareCount(prev => prev + 1);
          } else {
            throw new Error("Copy command failed");
          }
        } finally {
          document.body.removeChild(textArea);
        }
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("Link copied to clipboard!", "success");
      setShareCount(prev => prev + 1);
      
      // Track share event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "share", {
          method: "copy_link",
          content_type: activeTab,
          content_id: activeTab,
        });
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      showToast("Failed to copy link. Please try again.", "error");
    }
  }, [getCurrentUrl, activeTab]);

  // Show toast notification
  const showToast = useCallback((message: string, type: ToastType = "success") => {
    setToast({ show: true, message, type });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  // Share via Web Share API (mobile) with enhanced options
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${TAB_LABELS[activeTab]} - Our Work`,
          text: `Check out our ${TAB_LABELS[activeTab].toLowerCase()} portfolio`,
          url: getCurrentUrl(),
        });
        
        setShareCount(prev => prev + 1);
        showToast("Shared successfully!", "success");
        
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "share", {
            method: "native",
            content_type: activeTab,
            content_id: activeTab,
          });
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
          showToast("Share was cancelled", "info");
        }
      }
    } else {
      copyToClipboard();
    }
  }, [activeTab, getCurrentUrl, copyToClipboard, showToast]);

  // Share via Email
  const shareViaEmail = useCallback(() => {
    const subject = encodeURIComponent(`Check out our ${TAB_LABELS[activeTab].toLowerCase()} work`);
    const body = encodeURIComponent(
      `I thought you might be interested in our ${TAB_LABELS[activeTab].toLowerCase()} portfolio:\n\n${getCurrentUrl()}\n\nBest regards,`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    
    setShareCount(prev => prev + 1);
    showToast("Opening email client...", "info");
  }, [activeTab, getCurrentUrl, showToast]);

  // Social media share functions with enhanced tracking
  const createSocialShareHandler = useCallback((platform: keyof typeof SOCIAL_SHARE_CONFIG) => {
    return () => {
      const url = encodeURIComponent(getCurrentUrl());
      const text = encodeURIComponent(
        `Check out our ${TAB_LABELS[activeTab].toLowerCase()} portfolio!`
      );
      
      let shareUrl = "";
      
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=portfolio,${activeTab}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(
          shareUrl,
          "_blank",
          "width=550,height=420,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
        );
        
        setShareCount(prev => prev + 1);
        showToast(`Sharing to ${SOCIAL_SHARE_CONFIG[platform].label}...`, "info");
        
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "share", {
            method: platform,
            content_type: activeTab,
            content_id: activeTab,
          });
        }
      }
    };
  }, [activeTab, getCurrentUrl, showToast]);

  // Close share menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(e.target as Node) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(e.target as Node)
      ) {
        setShowShareMenu(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showShareMenu]);

  // Add keyboard navigation for share menu
  useEffect(() => {
    if (!showShareMenu || !shareMenuRef.current) return;

    const menuItems = shareMenuRef.current.querySelectorAll("button");
    const firstItem = menuItems[0] as HTMLElement;
    const lastItem = menuItems[menuItems.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstItem) {
          e.preventDefault();
          lastItem.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          firstItem.focus();
        }
      }
    };

    shareMenuRef.current.addEventListener("keydown", handleKeyDown);
    return () => shareMenuRef.current?.removeEventListener("keydown", handleKeyDown);
  }, [showShareMenu]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#000213] transition-colors duration-300">
      <Nav scrolled={scrolled} />

      <HeroShowcase activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content Section with ID for scrolling */}
      <div id="tab-content">
        <TabContentWrapper activeTab={activeTab} />
      </div>

      {/* Enhanced Share Section */}
      <div className="max-w-7xl mx-auto p-4 ">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Share this section
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share our {TAB_LABELS[activeTab].toLowerCase()} work with others
              {shareCount > 0 && (
                <span className="block text-xs mt-1 text-gray-500">
                  Shared {shareCount} time{shareCount !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 relative">
            {/* Main Share Button */}
            <div className="share-menu-container relative">
              <AnimatedButton
                onClick={() => {
                  setShowShareMenu(!showShareMenu);
                  if (!showShareMenu) {
                    // Track share menu open
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "share_menu_open", {
                        content_type: activeTab,
                      });
                    }
                  }
                }}
                ariaLabel="Share options"
                aria-expanded={showShareMenu}
                aria-haspopup="menu"
                aria-controls="share-menu"
                color="#a50044"
                className="relative"
              >
                <Share2 className="w-5 h-5" />
                Share
                {shareCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#a50044] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {shareCount}
                  </span>
                )}
              </AnimatedButton>

              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <div
                  id="share-menu"
                  ref={shareMenuRef}
                  role="menu"
                  aria-label="Share options"
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn z-50"
                >
                  {/* Menu Header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Share Options
                    </h4>
                    <button
                      onClick={() => setShowShareMenu(false)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      aria-label="Close share menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Copy Link Option */}
                  <button
                    role="menuitem"
                    onClick={copyToClipboard}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                    aria-label={copied ? "Link copied" : "Copy link to clipboard"}
                  >
                    <div className={`p-2 rounded-lg ${copied ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-700"}`}>
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-[#a50044]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {copied ? "Link copied!" : "Copy link"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Copy to clipboard
                      </p>
                    </div>
                  </button>

                  {/* Quick Social Share Buttons */}
                  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Share directly to
                    </p>
                    <div className="flex gap-2">
                      {(["twitter", "facebook", "linkedin"] as const).map((platform) => {
                        const { icon: Icon, color, label } = SOCIAL_SHARE_CONFIG[platform];
                        return (
                          <button
                            key={platform}
                            onClick={createSocialShareHandler(platform)}
                            className="flex-1 flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{ "--ring-color": color } as any}
                            aria-label={`Share on ${label}`}
                          >
                            <Icon className="w-5 h-5" style={{ color }} />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <button
                      role="menuitem"
                      onClick={shareViaEmail}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                      aria-label="Share via email"
                    >
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Share via Email
                      </span>
                    </button>

                    {/* Native Share for Mobile */}
                    {typeof window !== "undefined" && "share" in navigator && (
                      <button
                        role="menuitem"
                        onClick={handleNativeShare}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                        aria-label="More share options"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                          <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          More options...
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* URL Preview with Copy */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <LinkIcon className="w-4 h-4 text-gray-400 shrink-0" />
                <code className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {getCurrentUrl()}
                </code>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#a50044] focus:ring-offset-2"
                aria-label="Copy URL"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 animate-slideIn`}
          role="alert"
          aria-live="polite"
        >
          <div className={`
            flex items-center gap-3 px-6 py-3 rounded-lg shadow-2xl
            ${toast.type === "success" ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300" : ""}
            ${toast.type === "error" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300" : ""}
            ${toast.type === "info" ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300" : ""}
          `}>
            {toast.type === "success" && <Check className="w-5 h-5" />}
            {toast.type === "error" && <X className="w-5 h-5" />}
            {toast.type === "info" && <Share2 className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <Footer />

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </main>
  );
}