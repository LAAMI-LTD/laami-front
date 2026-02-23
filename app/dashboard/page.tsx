// app/dashboard/page.tsx
"use client";
import TabNavigation from "./components/TabNavigation";
import ProfileTab from "./components/ProfileTab";
import SubscribersTab from "./components/SubscribersTab";
import UserManagementTab from "./components/UserManagementTab";
import { useDashboard } from "./hooks/useDashboard";

export default function DashboardPage() {
  const {
    firebaseUser,
    backendUser,
    users,
    subscribers,
    loading,
    activeTab,
    roleUpdateLoading,
    subscriberActionLoading,
    error,
    success,
    subscriptionStatus,
    setActiveTab,
    handleLogout,
    handleSubscribe,
    handleUnsubscribe,
    updateUserRole,
    getRoleBadgeColor,
    getStatusBadgeColor,
    isSubscribed,
  } = useDashboard();

  if (loading) {
    return (
      <div className="
        min-h-screen flex items-center justify-center
        bg-[#f0f4ff] dark:bg-[#050d1a]
        text-[#004d98] dark:text-[#6fa8ff]
        text-xl font-semibold tracking-wide
      ">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner using brand color */}
          <span
            className="w-10 h-10 rounded-full border-4 border-[#004d98]/20 border-t-[#004d98] dark:border-[#6fa8ff]/20 dark:border-t-[#6fa8ff] animate-spin"
            aria-hidden="true"
          />
          Loading your dashboard…
        </div>
      </div>
    );
  }

  return (
    <>

      {/*
        Page shell
        Light: very light blue-tinted white
        Dark:  deep navy
      */}
      <section className="
        min-h-screen
        bg-[#f0f4ff] dark:bg-[#050d1a]
        text-[#0d1b2e] dark:text-[#e6eeff]
        pt-28 px-4 sm:px-6 pb-16
        transition-colors duration-300
      ">
        <div className="w-full max-w-7xl mx-auto space-y-6">

          {/* ── Tab Navigation ────────────────────────────── */}
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isAdmin={backendUser?.role === "admin"}
          />

          {/* ── Feedback banners ──────────────────────────── */}
          {error && (
            <div
              role="alert"
              className="
                flex items-start gap-3
                px-5 py-4 rounded-xl
                bg-[#a50044]/10 dark:bg-[#a50044]/20
                border border-[#a50044]/40
                text-[#7a0033] dark:text-[#ff99bb]
                text-sm font-medium
              "
            >
              {/* icon */}
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="
                flex items-start gap-3
                px-5 py-4 rounded-xl
                bg-[#004d98]/10 dark:bg-[#004d98]/30
                border border-[#004d98]/40
                text-[#003570] dark:text-[#99c2ff]
                text-sm font-medium
              "
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              {success}
            </div>
          )}

          {/* ── Tab panels ───────────────────────────────── */}

          {activeTab === "profile" && (
            <ProfileTab
              firebaseUser={firebaseUser}
              backendUser={backendUser}
              getRoleBadgeColor={getRoleBadgeColor}
              handleLogout={handleLogout}
            />
          )}

          {activeTab === "subscribers" && (
            <SubscribersTab
              backendUser={backendUser}
              subscribers={subscribers}
              subscriptionStatus={subscriptionStatus}
              subscriberActionLoading={subscriberActionLoading}
              isSubscribed={isSubscribed}
              getStatusBadgeColor={getStatusBadgeColor}
              handleSubscribe={handleSubscribe}
              handleUnsubscribe={handleUnsubscribe}
            />
          )}

          {activeTab === "users" && backendUser?.role === "admin" && (
            <UserManagementTab
              users={users}
              backendUser={backendUser}
              roleUpdateLoading={roleUpdateLoading}
              getRoleBadgeColor={getRoleBadgeColor}
              updateUserRole={updateUserRole}
            />
          )}

          {activeTab === "users" && backendUser?.role !== "admin" && (
            <div className="
              rounded-2xl
              bg-white dark:bg-[#0a1628]
              border border-[#004d98]/15 dark:border-[#004d98]/30
              p-10 text-center
              shadow-sm
            ">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-[#004d98]/30 dark:text-[#6fa8ff]/30"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 17v.01M12 13a4 4 0 10-4-4 4 4 0 004 4zm0 0v4m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium text-[#004d98]/60 dark:text-[#6fa8ff]/60">
                You don&apos;t have permission to view this page.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}