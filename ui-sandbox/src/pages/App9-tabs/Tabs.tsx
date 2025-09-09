import { useState } from "react";
import { type TechDataProp } from "./index";

interface TabsProps {
  tabs: TechDataProp[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabsArray = tabs.map((tab: TechDataProp, index) => {
    return (
      <button key={tab.label} onClick={() => setActiveIndex(index)}>
        {tab.label}
      </button>
    );
  });

  const activeTab = tabs[activeIndex].content;

  return (
    <>
      <div>{tabsArray}</div>
      <div>{activeTab}</div>
    </>
  );
};

export default Tabs;
