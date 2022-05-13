import { useState } from "react";

export const useUserDetailsTabs = () => {
  const [currentTab, setCurrentTab] = useState([
    { name: `Personal`, current: true },
    { name: `Poliza`, current: false },
    { name: `Notas`, current: false },
  ]);

  const handleTabClick = (name) => {
    setCurrentTab(
      currentTab.map((tab) => {
        return {
          ...tab,
          current: tab.name === name ? true : false,
        };
      })
    );
  };

  return { currentTab, handleTabClick };
};
