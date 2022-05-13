import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";

import { useState } from "react";

// TODO: We need to find out about the rest of the components that will be used in the dashboard.

export const useSwitcher = () => {
  const [module, setModule] = useState([
    {
      name: `Dashboard`,
      icon: HomeIcon,
      current: true,
    },
    {
      name: `Clientes`,
      icon: UsersIcon,
      current: false,
    },
    { name: `Chat`, icon: FolderIcon, current: false },
  ]);

  const handleModuleSwitch = (name) => {
    setModule((prevState) =>
      prevState.map((item) =>
        item.name === name
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  return { module, handleModuleSwitch };
};
