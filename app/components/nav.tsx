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
  Youtube, // 👈 add this
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
      // Sign out from Firebase
      await signOut(auth);

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Clear cookies
      await clearAuthCookies();

      // Redirect to home
      router.push("/auth");
      router.refresh(); // Force refresh to update server components
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
          {/* User Info */}
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

          {/* Dashboard Link */}
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

          {/* Logout */}
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
   Mobile Menu
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

      {/* Links */}
      <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
        {NAV_LINKS.regular.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center justify-between text-3xl font-light text-gray-300 hover:text-white transition group"
          >
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              {link.label}
            </span>
            <ChevronRight className="w-6 h-6 text-[#004d98] group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        ))}

        {/* Dashboard Link (if logged in) */}
        {user && (
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center justify-between text-3xl font-light text-gray-300 hover:text-white transition group"
          >
            <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
              <LayoutDashboard className="w-6 h-6" />
              Dashboard
            </span>
            <ChevronRight className="w-6 h-6 text-[#004d98]" />
          </Link>
        )}

        {/* Login/Logout */}
        {!user ? (
          <Link
            href="/auth"
            onClick={onClose}
            className="flex items-center justify-between text-3xl font-light text-gray-300 hover:text-white transition group"
          >
            <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
              Login
            </span>
            <ChevronRight className="w-6 h-6 text-[#004d98]" />
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center justify-between text-3xl font-light text-red-400 hover:text-red-300 transition group w-full text-left"
          >
            <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
              <LogOut className="w-6 h-6" />
              Logout
            </span>
            <ChevronRight className="w-6 h-6 text-[#004d98]" />
          </button>
        )}

        {/* CTA */}
        <Link
          href={NAV_LINKS.cta.href}
          onClick={onClose}
          className="px-6 py-2 font-semibold rounded-md text-white bg-[#a50044] hover:bg-[#004d98] transition flex items-center"
        >
          {NAV_LINKS.cta.label}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Link>

        {/* Social Icons - Mobile */}
        <div className="flex items-center gap-5 ml-4 pt-6">
          <Link
            href="https://www.instagram.com/laamilabs"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <Instagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.facebook.com/share/1Zv7PtL4T3/"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <Facebook className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/laami-labs-b294a13ab"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </Link>
          <Link
            href="https://discord.gg/mhu6kTgRB"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.045-.319 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
            </svg>
          </Link>
          <Link
            href="https://www.tiktok.com/@laamilabs"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2h3a6 6 0 006 6v3a9 9 0 01-6-2.3V16a6 6 0 11-6-6h1v3h-1a3 3 0 103 3V2z" />
            </svg>
          </Link>
          <Link
            href="https://youtube.com/@laamilabs?si=qHe32r0mx_7Uy5fY"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <Youtube className="w-5 h-5" />
          </Link>
          <Link
            href="https://whatsapp.com/channel/0029Vb7iPseEawdqBdD7Uc1A"
            target="_blank"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>
          <Link
            href="tel:+254707848528"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            href="tel:+254707848528"
            className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
          >
            <Phone className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="py-6 text-center text-xs text-white border-t border-gray-800">
        &copy; {new Date().getFullYear()} LaamiLabs
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Try to get user data from localStorage
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

        // Create user object with role
        const userWithRole = currentUser as FirebaseUser;
        userWithRole.role = userRole;
        setUser(userWithRole);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
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
        <div className=" mx-auto md:px-12 px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative bg-transparent w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/laami.png"
                  alt=""
                  width={42}
                  height={42}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-2xl font-bold tracking-tight leading-tight">
                <span className="text-[#004d98]">LAAMI</span>
                <span className="text-[#a50044]">LABS</span>

                <div className="text-[10px] font-medium tracking-widest text-gray-500 mt-1">
                  A DIVISION OF LAAMI LTD
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links - Center */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {NAV_LINKS.regular.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
              {/* CTA Button */}
              <Link
                href={NAV_LINKS.cta.href}
                className="px-6 py-2 font-semibold rounded-md text-white bg-[#a50044] hover:bg-[#004d98] transition flex items-center"
              >
                {NAV_LINKS.cta.label}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Social Icons - Far Right */}
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.instagram.com/laamilabs"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/share/1Zv7PtL4T3/"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/laami-labs-b294a13ab"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link
                  href="https://discord.gg/mhu6kTgRB"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.045-.319 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.372.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.tiktok.com/@laamilabs"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2h3a6 6 0 006 6v3a9 9 0 01-6-2.3V16a6 6 0 11-6-6h1v3h-1a3 3 0 103 3V2z" />
                  </svg>
                </Link>
                <Link
                  href="https://youtube.com/@laamilabs?si=qHe32r0mx_7Uy5fY"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <Youtube className="w-5 h-5" />
                </Link>

                <Link
                  href="https://whatsapp.com/channel/0029Vb7iPseEawdqBdD7Uc1A"
                  target="_blank"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <Link
                  href="mailto:hello@laamilabs.co.ke"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <Mail className="w-5 h-5" />
                </Link>
                <Link
                  href="tel:+254707848528"
                  className="text-white opacity-80 hover:opacity-100 hover:text-[#004d98] transition"
                >
                  <Phone className="w-5 h-5" />
                </Link>
              </div>

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
                >
                  <LogIn className="w-8 h-6 text-white" />
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
