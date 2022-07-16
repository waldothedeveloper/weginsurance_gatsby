import { useState } from "react";

export const useSelectUser = (handleNewUser) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    if (user) {
      setSelectedUser(user);
      handleNewUser(false);
    } else {
      setSelectedUser(null);
    }
  };

  return { selectedUser, handleSelectUser };
};
