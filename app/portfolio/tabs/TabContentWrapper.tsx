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
      className="relative z-20 pt-2"
    >
      {activeTab === "software" && <SoftwareContent />}
      {activeTab === "marketing" && <MarketingDesignContent />}
      {activeTab === "company" && <CompanyContent />}
    </div>
  );
}
