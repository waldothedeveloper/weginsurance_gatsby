import { EditUserForm } from "./editUserForm";
import { EmptyUserList } from "./emptyUserList";
import { NewUserForm } from "./newUserForm";
import { NoUsers } from "./empty";
import React from "react";
import { UserDetails } from "./details";
import { UserScreenLoader } from "../shared/loaders/usersScreenLoader";
import { UsersDictionary } from "./usersDictionary";
import { useCreateUser } from "../../hooks/user/useCreateUser";
import { useEditUser } from "../../hooks/user/useEditUser";
import { useReadUsers } from "../../hooks/user/useReadUsers";
import { useSwitcherUserCRUDMode } from "../../hooks/user/useSwitcherUserCRUDMode";

export const UsersScreen = () => {
  const { users } = useReadUsers();

  const {
    selectedUser,
    editUser,
    newUser,
    handleEditUser,
    handleNewUser,
    handleSelectUser,
    handleUserCRUDAction,
    handleUpdatedUser,
  } = useSwitcherUserCRUDMode();

  const { values, handleChange, handleSubmit, errors } = useCreateUser();
  const {
    userToEdit,
    editUserErrors,
    handleEditUserChange,
    handleUserEditSubmit,
  } = useEditUser(selectedUser, handleUpdatedUser);

  return (
    <div className="z-0 mx-auto grid grid-cols-12 gap-8 px-6">
      <div className="col-span-4 h-screen overflow-y-auto rounded-lg border-2 border-solid border-gray-100 py-6 lg:px-4">
        {users && users.length > 0 ? (
          <UsersDictionary
            users={users}
            handleUser={handleNewUser}
            handleSelectUser={handleSelectUser}
          />
        ) : users && users.length === 0 ? (
          <EmptyUserList createUser={handleNewUser} />
        ) : (
          <UserScreenLoader />
        )}
      </div>
      <div className="col-span-8 h-screen overflow-y-auto rounded-lg border-2 border-solid border-gray-100 pb-40 lg:px-4">
        {newUser ? (
          <NewUserForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            handleUser={handleUserCRUDAction}
          />
        ) : selectedUser ? (
          <UserDetails
            selectedUser={selectedUser}
            handleSelectedUser={handleSelectUser}
            handleEditUser={handleEditUser}
            users={users}
            handleUser={handleUserCRUDAction}
          />
        ) : editUser ? (
          <EditUserForm
            values={userToEdit}
            handleChange={handleEditUserChange}
            handleSubmit={handleUserEditSubmit}
            errors={editUserErrors}
            handleUser={handleUserCRUDAction}
          />
        ) : (
          <NoUsers createUser={handleNewUser} />
        )}
      </div>
    </div>
  );
};
