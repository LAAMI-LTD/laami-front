// components/dashboard/UserManagementTab.tsx
"use client";

import Image from "next/image";
import { BackendUser } from "../../types/dashboard";

interface UserManagementTabProps {
  users: BackendUser[];
  backendUser: BackendUser | null;
  roleUpdateLoading: string | null;
  getRoleBadgeColor: (role: string) => string;
  updateUserRole: (userId: string, newRole: string) => void;
}

function UserAvatar({ user }: { user: BackendUser }) {
  if (user.avatar) {
    return (
      <Image
        src={user.avatar}
        alt={user.name}
        width={36}
        height={36}
        className="rounded-full ring-2 ring-[#004d98]/20 dark:ring-[#004d98]/40 shrink-0"
      />
    );
  }
  return (
    <div className="
      w-9 h-9 rounded-full shrink-0
      flex items-center justify-center
      bg-[#004d98] text-white
      text-sm font-bold
      ring-2 ring-[#004d98]/20 dark:ring-[#004d98]/40
    ">
      {user.name?.charAt(0).toUpperCase() ?? "?"}
    </div>
  );
}

export default function UserManagementTab({
  users,
  backendUser,
  roleUpdateLoading,
  getRoleBadgeColor,
  updateUserRole,
}: UserManagementTabProps) {
  return (
    <div className="
      rounded-2xl overflow-hidden
      bg-white dark:bg-[#0a1628]
      border border-[#004d98]/15 dark:border-[#004d98]/30
      shadow-sm
    ">
      {/* ── Header bar ──────────────────────────────────── */}
      <div className="
        flex items-center justify-between gap-4
        px-6 py-4
        bg-[#004d98]/5 dark:bg-[#004d98]/10
        border-b border-[#004d98]/10 dark:border-[#004d98]/25
      ">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#004d98] dark:text-[#6fa8ff]">
          User Management
        </h2>
        <span className="
          px-2.5 py-0.5 rounded-full text-xs font-bold
          bg-[#004d98]/15 dark:bg-[#004d98]/30
          text-[#004d98] dark:text-[#99c2ff]
        ">
          {users.length} {users.length === 1 ? "user" : "users"}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <svg className="w-10 h-10 text-[#004d98]/20 dark:text-[#6fa8ff]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <p className="text-sm text-[#004d98]/50 dark:text-[#6fa8ff]/50">No users found</p>
        </div>
      ) : (
        <>
          {/* ── Desktop table (md+) ───────────────────────── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#004d98]/10 dark:border-[#004d98]/20">
                  {["User", "Email", "Role", "Author", "Change Role"].map((h) => (
                    <th
                      key={h}
                      className="
                        text-left px-5 py-3
                        text-xs font-semibold uppercase tracking-wider
                        text-[#004d98]/50 dark:text-[#6fa8ff]/50
                      "
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#004d98]/06 dark:divide-[#004d98]/15">
                {users.map((user) => {
                  const isSelf = user._id === backendUser?._id;
                  const isUpdating = roleUpdateLoading === user._id;
                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-[#004d98]/4 dark:hover:bg-[#004d98]/10 transition-colors duration-100"
                    >
                      {/* User */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} />
                          <div>
                            <p className="font-semibold text-[#0d1b2e] dark:text-[#e6eeff] leading-tight">
                              {user.name}
                            </p>
                            {isSelf && (
                              <p className="text-xs text-[#004d98]/50 dark:text-[#6fa8ff]/50">You</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 py-3.5 font-mono text-xs text-[#0d1b2e]/70 dark:text-[#e6eeff]/70 break-all">
                        {user.email}
                      </td>

                      {/* Current role badge */}
                      <td className="px-5 py-3.5">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full
                          text-xs font-semibold
                          ${getRoleBadgeColor(user.role)}
                        `}>
                          {user.role}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="px-5 py-3.5">
                        {user.author ? (
                          <span className="flex items-center gap-1.5 text-sm text-[#004d98] dark:text-[#99c2ff] font-medium">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {user.author.name}
                          </span>
                        ) : (
                          <span className="text-sm text-[#004d98]/30 dark:text-[#6fa8ff]/30">—</span>
                        )}
                      </td>

                      {/* Role select */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user._id, e.target.value)}
                            disabled={isUpdating || isSelf}
                            className="
                              rounded-lg px-3 py-1.5 text-xs font-medium
                              bg-[#004d98]/5 dark:bg-[#004d98]/15
                              border border-[#004d98]/20 dark:border-[#004d98]/35
                              text-[#0d1b2e] dark:text-[#e6eeff]
                              focus:outline-none focus:ring-2 focus:ring-[#004d98]/50
                              disabled:opacity-40 disabled:cursor-not-allowed
                              transition-colors duration-150
                            "
                          >
                            <option value="regular">Regular</option>
                            <option value="writer">Writer</option>
                            <option value="admin">Admin</option>
                          </select>

                          {isUpdating && (
                            <span className="w-4 h-4 rounded-full border-2 border-[#004d98]/30 border-t-[#004d98] dark:border-[#6fa8ff]/30 dark:border-t-[#6fa8ff] animate-spin" />
                          )}

                          {isSelf && !isUpdating && (
                            <span className="text-xs text-[#004d98]/40 dark:text-[#6fa8ff]/40 italic">
                              (you)
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards (< md) ───────────────────────── */}
          <ul className="md:hidden divide-y divide-[#004d98]/08 dark:divide-[#004d98]/20">
            {users.map((user) => {
              const isSelf = user._id === backendUser?._id;
              const isUpdating = roleUpdateLoading === user._id;
              return (
                <li key={user._id} className="px-5 py-5 space-y-4">
                  {/* Top row: avatar + name + role badge */}
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-[#0d1b2e] dark:text-[#e6eeff] truncate">
                          {user.name}
                        </p>
                        {isSelf && (
                          <span className="text-xs text-[#004d98]/50 dark:text-[#6fa8ff]/50 italic">(you)</span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-[#004d98]/50 dark:text-[#6fa8ff]/50 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full
                      text-xs font-semibold shrink-0
                      ${getRoleBadgeColor(user.role)}
                    `}>
                      {user.role}
                    </span>
                  </div>

                  {/* Author */}
                  {user.author && (
                    <div className="flex items-center gap-1.5 text-sm text-[#004d98] dark:text-[#99c2ff] font-medium">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Author: {user.author.name}
                    </div>
                  )}

                  {/* Role select */}
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-[#004d98]/50 dark:text-[#6fa8ff]/50 shrink-0">
                      Change role
                    </label>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      disabled={isUpdating || isSelf}
                      className="
                        flex-1 rounded-lg px-3 py-1.5 text-sm font-medium
                        bg-[#004d98]/5 dark:bg-[#004d98]/15
                        border border-[#004d98]/20 dark:border-[#004d98]/35
                        text-[#0d1b2e] dark:text-[#e6eeff]
                        focus:outline-none focus:ring-2 focus:ring-[#004d98]/50
                        disabled:opacity-40 disabled:cursor-not-allowed
                      "
                    >
                      <option value="regular">Regular</option>
                      <option value="writer">Writer</option>
                      <option value="admin">Admin</option>
                    </select>
                    {isUpdating && (
                      <span className="w-4 h-4 rounded-full border-2 border-[#004d98]/30 border-t-[#004d98] dark:border-[#6fa8ff]/30 dark:border-t-[#6fa8ff] animate-spin" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}