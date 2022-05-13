import { useState } from "react";
export const useSwitcherUserCRUDMode = () => {
  const [editUser, setEditUser] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = () => {
    setEditUser(true);
    setNewUser(false);
    setSelectedUser(null);
  };

  const handleNewUser = () => {
    setNewUser(true);
    setEditUser(false);
    setSelectedUser(null);
  };

  const handleSelectUser = (user) => {
    if (user) {
      setSelectedUser(user);
      setNewUser(false);
      setEditUser(false);
    }
  };

  const handleUserCRUDAction = () => {
    setNewUser(false);
    setEditUser(false);
    setSelectedUser(null);
  };

  const handleUpdatedUser = (user) => {
    setSelectedUser(user);
    setNewUser(false);
    setEditUser(false);
  };

  return {
    selectedUser,
    editUser,
    newUser,
    handleEditUser,
    handleNewUser,
    handleSelectUser,
    handleUserCRUDAction,
    handleUpdatedUser,
  };
};
