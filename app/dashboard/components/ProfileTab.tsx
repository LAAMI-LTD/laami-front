// components/dashboard/ProfileTab.tsx
"use client";

import Image from "next/image";
import { User as FirebaseUser } from "firebase/auth";
import { BackendUser } from "../../types/dashboard";

interface ProfileTabProps {
  firebaseUser: FirebaseUser | null;
  backendUser: BackendUser | null;
  getRoleBadgeColor: (role: string) => string;
  handleLogout: () => void;
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-[#004d98]/10 dark:border-[#004d98]/20 last:border-0">
      <span className="text-sm font-medium text-[#004d98]/50 dark:text-[#6fa8ff]/50 shrink-0">
        {label}
      </span>
      <span className="text-sm text-[#0d1b2e] dark:text-[#e6eeff] sm:text-right break-all">
        {children}
      </span>
    </div>
  );
}

export default function ProfileTab({
  firebaseUser,
  backendUser,
  getRoleBadgeColor,
  handleLogout,
}: ProfileTabProps) {
  // Check if user is already an author
  const isAuthor = !!backendUser?.author;

  // Function to generate WhatsApp message with user details
  const getWhatsAppMessage = () => {
    const message = `Hello, I'm interested in becoming a writer for your blog.

My Details:
- Name: ${backendUser?.name || firebaseUser?.displayName || "Not provided"}
- Email: ${firebaseUser?.email || "Not provided"}
- User ID: ${firebaseUser?.uid || "Not available"}
- Current Role: ${backendUser?.role || "regular"}
- Account Status: ${backendUser?.isActive ? "Active" : "Inactive"}
${backendUser?.lastLoginAt ? `- Last Login: ${new Date(backendUser.lastLoginAt).toLocaleString()}` : ""}

I would like to contribute to the blog. Please guide me through the next steps.`;

    return encodeURIComponent(message);
  };

  return (
    <div
      className="
      rounded-2xl
      bg-white dark:bg-[#0a1628]
      border border-[#004d98]/15 dark:border-[#004d98]/30
      shadow-sm
      overflow-hidden
    "
    >
      <div className="flex flex-col md:flex-row">
        {/* ── Left sidebar ────────────────────────────────── */}
        <aside
          className="
          md:w-72 shrink-0
          flex flex-col justify-center items-center text-center
          p-8 gap-5
          bg-[#004d98]/5 dark:bg-[#004d98]/10
          border-b md:border-b-0 md:border-r border-[#004d98]/10 dark:border-[#004d98]/25
        "
        >
          {/* Avatar */}
          {firebaseUser?.photoURL ? (
            <div
              className="
              w-28 h-28 rounded-full overflow-hidden
              ring-4 ring-[#004d98]/30 dark:ring-[#004d98]/50
              shadow-md shrink-0
            "
            >
              <Image
                src={firebaseUser.photoURL}
                alt="Profile photo"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            /* Fallback monogram */
            <div
              className="
              w-28 h-28 rounded-full shrink-0
              flex items-center justify-center
              bg-[#004d98] text-white
              text-3xl font-bold
              ring-4 ring-[#004d98]/30 dark:ring-[#004d98]/50
              shadow-md
            "
            >
              {(backendUser?.name || firebaseUser?.displayName || "?")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          {/* Name & email */}
          <div>
            <h1 className="text-xl font-bold text-[#0d1b2e] dark:text-[#e6eeff] leading-tight">
              {backendUser?.name || firebaseUser?.displayName || "Welcome"}
            </h1>
            <p className="text-sm text-[#004d98]/60 dark:text-[#6fa8ff]/70 mt-1 break-all">
              {firebaseUser?.email}
            </p>
          </div>

          {/* Role badge */}
          <span
            className={`
            inline-flex items-center px-3 py-1 rounded-full
            text-xs font-semibold tracking-wide
            ${getRoleBadgeColor(backendUser?.role || "regular")}
          `}
          >
            {(backendUser?.role || "Regular").charAt(0).toUpperCase() +
              (backendUser?.role || "regular").slice(1)}{" "}
          </span>

          {/* Author chip */}
          {backendUser?.author && (
            <div
              className="
              w-full px-4 py-3 rounded-xl
              bg-white dark:bg-[#0d1f38]
              border border-[#004d98]/15 dark:border-[#004d98]/30
              text-left
            "
            >
              <p className="text-xs text-[#004d98]/50 dark:text-[#6fa8ff]/50 mb-0.5">
                Author Profile
              </p>
              <p className="text-sm font-semibold text-[#004d98] dark:text-[#99c2ff]">
                {backendUser.author.name}
              </p>
            </div>
          )}
        </aside>

        {/* ── Main content ────────────────────────────────── */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
          {/* Account Details card */}
          <div
            className="
            rounded-xl
            border border-[#004d98]/10 dark:border-[#004d98]/25
            overflow-hidden
          "
          >
            {/* Card header */}
            <div
              className="
              px-5 py-3
              bg-[#004d98]/5 dark:bg-[#004d98]/15
              border-b border-[#004d98]/10 dark:border-[#004d98]/25
            "
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#004d98] dark:text-[#6fa8ff]">
                Account Details
              </h2>
            </div>

            {/* Rows */}
            <div className="px-5 divide-y divide-[#004d98]/08 dark:divide-[#004d98]/15">
              <DetailRow label="Email Verified">
                <span
                  className={
                    firebaseUser?.emailVerified
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-amber-600 dark:text-amber-400 font-medium"
                  }
                >
                  {firebaseUser?.emailVerified ? "Verified ✓" : "Not Verified"}
                </span>
              </DetailRow>

              {backendUser?.lastLoginAt && (
                <DetailRow label="Last Login">
                  {new Date(backendUser.lastLoginAt).toLocaleString()}
                </DetailRow>
              )}

              <DetailRow label="Account Status">
                <span
                  className={
                    backendUser?.isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-[#a50044] dark:text-[#ff99bb] font-medium"
                  }
                >
                  {backendUser?.isActive ? "Active" : "Inactive"}
                </span>
              </DetailRow>

              {backendUser?.bio && (
                <div className="py-3">
                  <p className="text-sm font-medium text-[#004d98]/50 dark:text-[#6fa8ff]/50 mb-1">
                    Bio
                  </p>
                  <p className="text-sm text-[#0d1b2e] dark:text-[#e6eeff] leading-relaxed">
                    {backendUser.bio}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Become a Writer Card - Only show if user is NOT an author */}
          {!isAuthor && (
            <div
              className="
              rounded-xl
              border border-[#004d98]/10 dark:border-[#004d98]/25
              overflow-hidden
              bg-gradient-to-r from-[#004d98]/5 to-[#a50044]/5
            "
            >
              {/* Card header */}
              <div
                className="
                px-5 py-3
                bg-[#004d98]/5 dark:bg-[#004d98]/15
                border-b border-[#004d98]/10 dark:border-[#004d98]/25
              "
              >
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#004d98] dark:text-[#6fa8ff]">
                  Become a Writer
                </h2>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-[#0d1b2e] dark:text-[#e6eeff] mb-4">
                  Whether you&apos;re an experienced writer or simply passionate about
                  a topic, we&apos;d love to collaborate. Share your expertise, inspire
                  readers, and be part of a community that values impactful
                  storytelling.
                </p>

                <a
                  href={`https://wa.me/234707848528?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    w-full sm:w-auto px-6 py-3 rounded-xl
                    bg-[#25D366] hover:bg-[#128C7E]
                    text-white font-semibold text-sm tracking-wide
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2
                    shadow-sm
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.473-.149-.673.15-.2.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.673-1.62-.922-2.22-.242-.579-.487-.5-.673-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.118 1.52 5.85L.052 23.334c-.091.366.225.722.59.632l5.569-1.392C8.236 22.828 10.044 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.604-.507-5.106-1.39l-.367-.212-4.111 1.028 1.09-4.015-.194-.392A9.958 9.958 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Become a writer today
                </a>

                <p className="text-xs text-[#004d98]/50 dark:text-[#6fa8ff]/50 mt-3">
                  or reach out via 0707 848 528
                </p>
              </div>
            </div>
          )}

          {/* Optional: Show a different message for existing authors */}
          {isAuthor && (
            <div
              className="
              rounded-xl
              border border-[#004d98]/10 dark:border-[#004d98]/25
              overflow-hidden
              bg-[#004d98]/5 dark:bg-[#004d98]/10
            "
            >
              <div className="p-5 text-center">
                <p className="text-sm text-[#004d98] dark:text-[#6fa8ff] font-medium">
                  You are already an author!
                </p>
                <p className="text-xs text-[#004d98]/50 dark:text-[#6fa8ff]/50 mt-1">
                  Thank you for being part of our writing community.
                </p>
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="
                w-full sm:w-auto px-8 py-3 rounded-xl
                bg-[#a50044] hover:bg-[#cc0055]
                text-white font-semibold text-sm tracking-wide
                transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a50044] focus-visible:ring-offset-2
                shadow-sm
              "
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}