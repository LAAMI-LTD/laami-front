// components/tab-content/TabContentWrapper.tsx
"use client";

import { TabId } from "../page";
import CompanyContent from "./company/CompanyContent";
import MarketingDesignContent from "./marketing/MarketingDesignContent";
import SoftwareContent from "./software/SoftwareContent";

interface TabContentWrapperProps {
  activeTab: TabId;
}

export default function TabContentWrapper({ activeTab }: TabContentWrapperProps) {
  return (
    <div
      className="
        relative z-20 pt-6
        bg-linear-to-b
        from-white/80 to-gray-100
        dark:from-black/20 dark:to-black/80
      "
    >
      <div className="container mx-auto sm:px-6 ">
        <div className="max-w-6xl mx-auto">
          {activeTab === "software" && <SoftwareContent />}
          {activeTab === "marketing" && <MarketingDesignContent />}
          {activeTab === "company" && <CompanyContent />}
        </div>
      </div>
    </div>
  );
}
