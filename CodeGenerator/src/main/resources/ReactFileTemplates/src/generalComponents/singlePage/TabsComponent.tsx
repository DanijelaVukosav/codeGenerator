import React, { FC, ReactNode, useState } from "react";
import "../../styles/singlePage.css";

export interface Tab {
  tabTitle: string;
  tabContent: React.ReactNode;
};

interface PageTabsProps {
  tabs: Tab[];
};

export const PageTabs: React.FC<PageTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsWrapper>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div className="tab" key={index}>
            <label htmlFor={`tab-${index}`} className={activeTab === index ? "checked-label" : ""} onClick={() => setActiveTab(index)}>
              {tab.tabTitle}
            </label>
            <input id={`tab-${index}`} name="tabs" type="radio" checked={activeTab === index} onChange={() => setActiveTab(index)} />
          </div>
        ))}
      </div>
      <div>{tabs[activeTab]?.tabContent ?? <></>}</div>
    </TabsWrapper>
  );
};

export const TabsWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="tabs-container">{children}</div>;
};
