// components/dashboard/SubscribersTab.tsx
"use client";

import { Mail, UserX, Users, Bell, BellOff, Download, FileText } from "lucide-react";
import { BackendUser, Subscriber } from "../../types/dashboard";

interface SubscribersTabProps {
  backendUser: BackendUser | null;
  subscribers: Subscriber[];
  subscriptionStatus: string;
  subscriberActionLoading: string | null;
  isSubscribed: () => boolean;
  getStatusBadgeColor: (status: string) => string;
  handleSubscribe: () => void;
  handleUnsubscribe: () => void;
}

export default function SubscribersTab({
  backendUser,
  subscribers,
  subscriptionStatus,
  subscriberActionLoading,
  isSubscribed,
  getStatusBadgeColor,
  handleSubscribe,
  handleUnsubscribe,
}: SubscribersTabProps) {
  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const unsubCount = subscribers.filter((s) => s.status === "UNSUBSCRIBED").length;
  const subscribed = isSubscribed();

  // Function to download emails as a text file
  const downloadEmails = (type: "active" | "all") => {
    // Filter emails based on type
    const emailsToDownload = type === "active" 
      ? subscribers.filter(s => s.status === "active").map(s => s.email)
      : subscribers.map(s => s.email);
    
    // Create file content
    const fileContent = emailsToDownload.join("\n");
    
    // Create filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = type === "active" 
      ? `active-subscribers-${date}.txt`
      : `all-subscribers-${date}.txt`;
    
    // Create download
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to download emails with names as a text file
  const downloadEmailsWithNames = (type: "active" | "all") => {
    // Filter subscribers based on type
    const subscribersToDownload = type === "active"
      ? subscribers.filter(s => s.status === "active")
      : subscribers;
    
    // Create file content with emails and names
    const fileContent = subscribersToDownload
      .map(s => `${s.email}${s.name ? `,${s.name}` : ''}`)
      .join("\n");
    
    // Create filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = type === "active"
      ? `active-subscribers-with-names-${date}.txt`
      : `all-subscribers-with-names-${date}.txt`;
    
    // Create download
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* ── Subscription status card ──────────────────────── */}
      <div className="
        rounded-2xl overflow-hidden
        bg-white dark:bg-[#0a1628]
        border border-[#004d98]/15 dark:border-[#004d98]/30
        shadow-sm
      ">
        {/* Card header */}
        <div className="
          flex items-center gap-3
          px-6 py-4
          border-b border-[#004d98]/10 dark:border-[#004d98]/25
          bg-[#004d98]/5 dark:bg-[#004d98]/10
        ">
          <Mail className="w-5 h-5 text-[#004d98] dark:text-[#6fa8ff]" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#004d98] dark:text-[#6fa8ff]">
            Newsletter Subscription
          </h2>
        </div>

        <div className="px-6 py-6">
          {subscriptionStatus === "checking" ? (
            <div className="flex items-center gap-3 text-[#004d98]/50 dark:text-[#6fa8ff]/50">
              <span className="w-4 h-4 rounded-full border-2 border-[#004d98]/30 border-t-[#004d98] dark:border-[#6fa8ff]/30 dark:border-t-[#6fa8ff] animate-spin" />
              <span className="text-sm">Checking subscription status…</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Status info */}
              <div className="flex items-start gap-4">
                {/* Icon pill */}
                <div className={`
                  p-3 rounded-xl shrink-0
                  ${subscribed
                    ? "bg-[#004d98]/10 dark:bg-[#004d98]/20"
                    : "bg-[#004d98]/5 dark:bg-[#004d98]/10"
                  }
                `}>
                  {subscribed
                    ? <Bell className="w-5 h-5 text-[#004d98] dark:text-[#6fa8ff]" />
                    : <BellOff className="w-5 h-5 text-[#004d98]/40 dark:text-[#6fa8ff]/40" />
                  }
                </div>

                <div>
                  <p className="font-semibold text-[#0d1b2e] dark:text-[#e6eeff]">
                    {subscribed
                      ? "You're subscribed to our newsletter"
                      : "You're not subscribed yet"}
                  </p>
                  <p className="text-sm text-[#004d98]/60 dark:text-[#6fa8ff]/60 mt-0.5">
                    {subscribed
                      ? "You'll receive updates about new articles and tutorials."
                      : "Subscribe to get the latest content delivered to your inbox."}
                  </p>
                </div>
              </div>

              {/* Action button */}
              {subscribed ? (
                <button
                  onClick={handleUnsubscribe}
                  disabled={subscriberActionLoading === "unsubscribe"}
                  className="
                    shrink-0 flex hidden items-center justify-center gap-2
                    px-5 py-2.5 rounded-xl
                    bg-[#a50044] hover:bg-[#cc0055]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    text-white text-sm font-semibold
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a50044] focus-visible:ring-offset-2
                    shadow-sm
                  "
                >
                  {subscriberActionLoading === "unsubscribe" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Unsubscribing…
                    </>
                  ) : (
                    <>
                      <UserX className="w-4 h-4" />
                      Unsubscribe
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={subscriberActionLoading === "subscribe"}
                  className="
                    shrink-0 flex items-center justify-center gap-2
                    px-5 py-2.5 rounded-xl
                    bg-[#004d98] hover:bg-[#0061be]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    text-white text-sm font-semibold
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d98] focus-visible:ring-offset-2
                    shadow-sm
                  "
                >
                  {subscriberActionLoading === "subscribe" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Admin subscriber list ──────────────────────────── */}
      {backendUser?.role === "admin" && (
        <div className="
          rounded-2xl overflow-hidden
          bg-white dark:bg-[#0a1628]
          border border-[#004d98]/15 dark:border-[#004d98]/30
          shadow-sm
        ">
          {/* Table header bar */}
          <div className="
            flex flex-col sm:flex-row sm:items-center justify-between gap-3
            px-6 py-4
            border-b border-[#004d98]/10 dark:border-[#004d98]/25
            bg-[#004d98]/5 dark:bg-[#004d98]/10
          ">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#004d98] dark:text-[#6fa8ff]">
              <Users className="w-4 h-4" />
              All Subscribers
              <span className="
                ml-1 px-2 py-0.5 rounded-full text-xs
                bg-[#004d98]/15 dark:bg-[#004d98]/30
                text-[#004d98] dark:text-[#99c2ff]
                font-bold tracking-normal
              ">
                {subscribers.length}
              </span>
            </h3>

            {/* Stat chips and download buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="
                flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                bg-emerald-50 dark:bg-emerald-900/20
                text-emerald-700 dark:text-emerald-400
                border border-emerald-200 dark:border-emerald-800
              ">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active: {activeCount}
              </span>
              <span className="
                flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                bg-[#004d98]/5 dark:bg-[#004d98]/15
                text-[#004d98]/60 dark:text-[#6fa8ff]/60
                border border-[#004d98]/10 dark:border-[#004d98]/25
              ">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004d98]/30 dark:bg-[#6fa8ff]/30" />
                Unsubscribed: {unsubCount}
              </span>
            </div>
          </div>

          {/* Download options */}
          <div className="
            px-6 py-4
            bg-[#004d98]/4 dark:bg-[#004d98]/8
            border-b border-[#004d98]/10 dark:border-[#004d98]/25
            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
          ">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#004d98]/40 dark:text-[#6fa8ff]/40" />
              <span className="text-xs font-medium text-[#004d98]/50 dark:text-[#6fa8ff]/50">
                Download email lists:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Active emails download */}
              <button
                onClick={() => downloadEmails("active")}
                disabled={activeCount === 0}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-lg
                  bg-emerald-50 dark:bg-emerald-900/20
                  hover:bg-emerald-100 dark:hover:bg-emerald-900/30
                  disabled:opacity-40 disabled:cursor-not-allowed
                  text-emerald-700 dark:text-emerald-400
                  text-xs font-semibold
                  transition-colors duration-150
                  border border-emerald-200 dark:border-emerald-800
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                "
              >
                <FileText className="w-3.5 h-3.5" />
                Active Emails ({activeCount})
              </button>

              {/* All emails download */}
              <button
                onClick={() => downloadEmails("all")}
                disabled={subscribers.length === 0}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-lg
                  bg-[#004d98]/10 dark:bg-[#004d98]/20
                  hover:bg-[#004d98]/15 dark:hover:bg-[#004d98]/25
                  disabled:opacity-40 disabled:cursor-not-allowed
                  text-[#004d98] dark:text-[#6fa8ff]
                  text-xs font-semibold
                  transition-colors duration-150
                  border border-[#004d98]/20 dark:border-[#004d98]/30
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d98]
                "
              >
                <FileText className="w-3.5 h-3.5" />
                All Emails ({subscribers.length})
              </button>

              {/* Active with names download */}
              <button
                onClick={() => downloadEmailsWithNames("active")}
                disabled={activeCount === 0}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-lg
                  bg-purple-50 dark:bg-purple-900/20
                  hover:bg-purple-100 dark:hover:bg-purple-900/30
                  disabled:opacity-40 disabled:cursor-not-allowed
                  text-purple-700 dark:text-purple-400
                  text-xs font-semibold
                  transition-colors duration-150
                  border border-purple-200 dark:border-purple-800
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                "
              >
                <FileText className="w-3.5 h-3.5" />
                Active with Names ({activeCount})
              </button>

              {/* All with names download */}
              <button
                onClick={() => downloadEmailsWithNames("all")}
                disabled={subscribers.length === 0}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-lg
                  bg-blue-50 dark:bg-blue-900/20
                  hover:bg-blue-100 dark:hover:bg-blue-900/30
                  disabled:opacity-40 disabled:cursor-not-allowed
                  text-blue-700 dark:text-blue-400
                  text-xs font-semibold
                  transition-colors duration-150
                  border border-blue-200 dark:border-blue-800
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                "
              >
                <FileText className="w-3.5 h-3.5" />
                All with Names ({subscribers.length})
              </button>
            </div>
          </div>

          {subscribers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Users className="w-10 h-10 text-[#004d98]/20 dark:text-[#6fa8ff]/20" />
              <p className="text-sm text-[#004d98]/50 dark:text-[#6fa8ff]/50">
                No subscribers found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#004d98]/10 dark:border-[#004d98]/20">
                    {["Email", "Name", "Status", "Subscribed Date"].map((h) => (
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
                  {subscribers.map((subscriber) => (
                    <tr
                      key={subscriber._id}
                      className="hover:bg-[#004d98]/4 dark:hover:bg-[#004d98]/10 transition-colors duration-100"
                    >
                      <td className="px-5 py-3.5 font-mono text-xs text-[#0d1b2e] dark:text-[#e6eeff] break-all">
                        {subscriber.email}
                      </td>
                      <td className="px-5 py-3.5 text-[#0d1b2e] dark:text-[#e6eeff]">
                        {subscriber.name || (
                          <span className="text-[#004d98]/30 dark:text-[#6fa8ff]/30">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                          ${getStatusBadgeColor(subscriber.status)}
                        `}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#004d98]/55 dark:text-[#6fa8ff]/55 whitespace-nowrap">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Non-admin note ─────────────────────────────────── */}
      {backendUser?.role !== "admin" && (
        <p className="text-center text-sm text-[#004d98]/50 dark:text-[#6fa8ff]/50 py-4">
          Only admins can view the full subscriber list.
        </p>
      )}

    </div>
  );
}