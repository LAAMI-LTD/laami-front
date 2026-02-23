// components/dashboard/TabNavigation.tsx
"use client";

type Tab = "profile" | "subscribers" | "users";

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isAdmin: boolean;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "subscribers",
    label: "Newsletter",
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "users",
    label: "User Management",
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
      </svg>
    ),
  },
];

export default function TabNavigation({ activeTab, setActiveTab, isAdmin }: TabNavigationProps) {
  const visibleTabs = isAdmin ? TABS : TABS.filter((t) => t.id !== "users");

  return (
    <nav
      aria-label="Dashboard sections"
      className="
        mb-6
        flex gap-1 flex-wrap
        p-1.5 rounded-2xl
        bg-white dark:bg-[#0a1628]
        border border-[#004d98]/15 dark:border-[#004d98]/30
        shadow-sm
      "
    >
      {visibleTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={`
              flex items-center justify-center sm:justify-start gap-2
              flex-1 min-w-fit
              px-4 py-2.5 rounded-xl
              text-sm font-semibold tracking-wide whitespace-nowrap
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d98] focus-visible:ring-offset-1
              ${
                isActive
                  ? "bg-[#004d98] text-white shadow-sm"
                  : `
                    text-[#004d98]/60 dark:text-[#6fa8ff]/60
                    hover:bg-[#004d98]/8 dark:hover:bg-[#004d98]/20
                    hover:text-[#004d98] dark:hover:text-[#99c2ff]
                  `
              }
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {isActive && (
              <span
                className="hidden sm:block ml-auto w-1.5 h-1.5 rounded-full bg-[#a50044]"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}