import React from "react";
import { UserDetails } from "./details";
import { UsersDictionary } from "./usersDictionary";
import { UsersForm } from "./form";
import { useEditUser } from "../../hooks/user/useEditUser";

export const UsersScreen = () => {
  const { editUser, handleEditUser } = useEditUser();

  return (
    <div className="z-0 mx-auto grid grid-cols-12 gap-8 px-6">
      <div className="col-span-4 h-screen overflow-y-auto rounded-lg border-2 border-solid border-gray-100 py-6 lg:px-4">
        <UsersDictionary />
      </div>
      <div className="col-span-8 h-screen overflow-y-auto rounded-lg border-2 border-solid border-gray-100 pb-40 lg:px-4">
        {editUser ? (
          <UsersForm handleEditUser={handleEditUser} />
        ) : (
          <UserDetails handleEditUser={handleEditUser} />
        )}
      </div>
    </div>
  );
};
