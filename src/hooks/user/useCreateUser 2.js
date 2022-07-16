import { useState } from "react";
export const useCreateUser = () => {
  const [newUser, setNewUser] = useState(false);

  const handleNewUser = (bool) => {
    setNewUser(bool);
  };

  return { newUser, handleNewUser };
};
