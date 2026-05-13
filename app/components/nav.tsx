"use client";

import {
  Menu,
  X,
  ChevronRight,
  LogIn,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Youtube,
} from "lucide-react";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

interface NavProps {
  scrolled: boolean;
}

interface FirebaseUser extends User {
  role?: "admin" | "writer" | "regular";
}

const NAV_LINKS = {
  regular: [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/services", label: "Services" },
  ] as const,
  cta: { href: "/contacts", label: "Reach us" } as const,
} as const;

// Helper function to clear cookies
const clearAuthCookies = async () => {
  try {
    await fetch("/api/auth/clear-cookie", {
      method: "POST",
    });
  } catch (error) {
    console.error("Error clearing cookies:", error);
  }
};

/* =========================
   User Dropdown Menu
========================= */
const UserDropdown = ({
  user,
  onClose,
}: {
  user: FirebaseUser;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      await clearAuthCookies();
      router.push("/auth");
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "admin":
        return "bg-pink-900 text-white";
      case "writer":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none group"
      >
        {user.photoURL ? (
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#004d98] transition-all">
            <Image
              src={user.photoURL}
              alt={user.displayName || "User"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#004d98] flex items-center justify-center text-white font-semibold group-hover:bg-[#a50044] transition">
            {user.displayName?.[0] || user.email?.[0] || "U"}
          </div>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 z-[999] bg-gray-900 rounded-lg shadow-xl border border-gray-800 py-2 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-sm font-medium text-white truncate">
              {user.displayName || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
            {user.role && (
              <span
                className={`inline-block mt-1 text-xs px-2 py-0.5 ${getRoleColor(user.role)} text-white rounded-full capitalize`}
              >
                {user.role}
              </span>
            )}
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
            onClick={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition border-t border-gray-800 mt-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================
   Mobile Menu Content
========================= */
const MobileMenuContent = ({
  onClose,
  user,
}: {
  onClose: () => void;
  user: FirebaseUser | null;
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      await clearAuthCookies();
      router.push("/auth");
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "admin":
        return "bg-pink-900";
      case "writer":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-gray-950 animate-in slide-in-from-right">
      {/* Top Bar */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800 bg-gray-950/95">
        <Link
          href="/"
          onClick={onClose}
          className="font-bold text-white text-lg"
        >
          LAAMI<span className="text-[#a50044]">LABS</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-md bg-gray-800 hover:bg-[#004d98] transition"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* User Profile Section (if logged in) */}
      {user && (
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#004d98] flex items-center justify-center text-white font-semibold text-lg">
                {user.displayName?.[0] || user.email?.[0] || "U"}
              </div>
            )}
            <div className="flex-1">
              <p className="text-white font-medium">
                {user.displayName || "User"}
              </p>
              <p className="text-sm text-gray-400">{user.email}</p>
              {user.role && (
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 ${getRoleColor(user.role)} text-white rounded-full capitalize`}
                >
                  {user.role}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links - Priority */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-8 space-y-6">
          {NAV_LINKS.regular.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between text-2xl font-medium text-gray-300 hover:text-white transition group"
            >
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                {link.label}
              </span>
              <ChevronRight className="w-5 h-5 text-[#004d98] group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ))}

          {/* Dashboard Link (if logged in) */}
          {user && (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center justify-between text-2xl font-medium text-gray-300 hover:text-white transition group"
            >
              <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                <LayoutDashboard className="w-6 h-6" />
                Dashboard
              </span>
              <ChevronRight className="w-5 h-5 text-[#004d98]" />
            </Link>
          )}

          {/* Login/Logout */}
          {!user ? (
            <Link
              href="/auth"
              onClick={onClose}
              className="flex items-center justify-between text-2xl font-medium text-gray-300 hover:text-white transition group"
            >
              <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                <LogIn className="w-6 h-6" />
                Login
              </span>
              <ChevronRight className="w-5 h-5 text-[#004d98]" />
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center justify-between text-2xl font-medium text-red-400 hover:text-red-300 transition group w-full text-left"
            >
              <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                <LogOut className="w-6 h-6" />
                Logout
              </span>
              <ChevronRight className="w-5 h-5 text-[#004d98]" />
            </button>
          )}

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href={NAV_LINKS.cta.href}
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 font-semibold rounded-md text-white bg-[#a50044] hover:bg-[#004d98] transition"
            >
              {NAV_LINKS.cta.label}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Social Icons - Moved to bottom with less prominence */}
        <div className="px-6 py-6 border-t border-gray-800 mt-auto">
          <p className="text-xs text-gray-500 mb-4">FOLLOW US</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/laamilabs"
              target="_blank"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.facebook.com/share/1Zv7PtL4T3/"
              target="_blank"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/laami-labs-b294a13ab"
              target="_blank"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            <Link
              href="https://www.tiktok.com/@laamilabs"
              target="_blank"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2h3a6 6 0 006 6v3a9 9 0 01-6-2.3V16a6 6 0 11-6-6h1v3h-1a3 3 0 103 3V2z" />
              </svg>
            </Link>
            <Link
              href="https://youtube.com/@laamilabs?si=qHe32r0mx_7Uy5fY"
              target="_blank"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link
              href="https://whatsapp.com/channel/0029Vb7iPseEawdqBdD7Uc1A"
              target="_blank"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:hello@laamilabs.co.ke"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <Mail className="w-5 h-5" />
            </Link>
            <Link
              href="tel:+254707848528"
              className="text-gray-400 hover:text-[#004d98] transition"
            >
              <Phone className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-6 text-center text-xs text-gray-500 border-t border-gray-800">
        &copy; {new Date().getFullYear()} LaamiLabs
      </div>
    </div>
  );
};

/* =========================
   Desktop Social Icons Component (Collapsible)
========================= */
const DesktopSocialIcons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const socialLinks = [
    { href: "https://www.instagram.com/laamilabs", icon: Instagram, label: "Instagram" },
    { href: "https://www.facebook.com/share/1Zv7PtL4T3/", icon: Facebook, label: "Facebook" },
    { href: "https://www.linkedin.com/in/laami-labs-b294a13ab", icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ), label: "LinkedIn" },
    { href: "https://www.tiktok.com/@laamilabs", icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2h3a6 6 0 006 6v3a9 9 0 01-6-2.3V16a6 6 0 11-6-6h1v3h-1a3 3 0 103 3V2z" />
      </svg>
    ), label: "TikTok" },
    { href: "https://youtube.com/@laamilabs?si=qHe32r0mx_7Uy5fY", icon: Youtube, label: "YouTube" },
    { href: "https://whatsapp.com/channel/0029Vb7iPseEawdqBdD7Uc1A", icon: MessageCircle, label: "WhatsApp" },
    { href: "mailto:hello@laamilabs.co.ke", icon: Mail, label: "Email" },
    { href: "tel:+254707848528", icon: Phone, label: "Phone" },
  ];

  // Show only 4 icons initially, rest in dropdown
  const visibleIcons = isExpanded ? socialLinks : socialLinks.slice(0, 4);
  const hiddenCount = socialLinks.length - 4;

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        {visibleIcons.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            className="text-gray-400 hover:text-[#004d98] transition-colors"
            title={link.label}
          >
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
        
        {!isExpanded && hiddenCount > 0 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-gray-400 hover:text-[#004d98] transition-colors text-xs font-medium"
            title="More social links"
          >
            +{hiddenCount}
          </button>
        )}
        
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-400 hover:text-[#004d98] transition-colors text-xs font-medium"
            title="Show less"
          >
            Less
          </button>
        )}
      </div>
    </div>
  );
};

/* =========================
   Main Nav
========================= */
export default function Nav({ scrolled }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const storedUser = localStorage.getItem("user");
        let userRole: FirebaseUser["role"] = "regular";

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            userRole = parsedUser.role || "regular";
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }

        const userWithRole = currentUser as FirebaseUser;
        userWithRole.role = userRole;
        setUser(userWithRole);
      } else {
        setUser(null);
      }
    });

    // Check for tablet screen size
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkTablet();
    window.addEventListener('resize', checkTablet);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', checkTablet);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-800"
            : "bg-gray-950/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/laami.png"
                  alt="LaamiLabs Logo"
                  width={42}
                  height={42}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                  <span className="text-[#004d98]">LAAMI</span>
                  <span className="text-[#a50044]">LABS</span>
                </div>
                <div className="hidden sm:block text-[8px] md:text-[10px] font-medium tracking-widest text-gray-500 -mt-1">
                  A DIVISION OF LAAMI LTD
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links - Center (Priority) */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 xl:space-x-10">
              {NAV_LINKS.regular.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition whitespace-nowrap text-sm lg:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section - Condensed */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {/* CTA Button */}
              <Link
                href={NAV_LINKS.cta.href}
                className="px-4 py-1.5 lg:px-6 lg:py-2 font-semibold rounded-md text-white bg-[#a50044] hover:bg-[#004d98] transition flex items-center text-sm lg:text-base whitespace-nowrap"
              >
                {NAV_LINKS.cta.label}
                <ChevronRight className="ml-1 lg:ml-2 w-3 h-3 lg:w-4 lg:h-4" />
              </Link>

              {/* Social Icons - Collapsible/Compact */}
              <DesktopSocialIcons />

              {/* User Menu */}
              {user ? (
                <UserDropdown
                  user={user}
                  onClose={() => setMobileMenuOpen(false)}
                />
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  title="Login"
                >
                  <LogIn className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md bg-gray-900 hover:bg-[#004d98] transition"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <MobileMenuContent
          onClose={() => setMobileMenuOpen(false)}
          user={user}
        />
      )}
    </>
  );
}