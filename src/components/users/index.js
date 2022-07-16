import { EditUserForm } from "./editUserForm";
import { EmptyUserList } from "./emptyUserList";
import { NewUserForm } from "./newUserForm";
import { NoUsers } from "./empty";
import React from "react";
import { SharedScreen } from "../shared/screen";
import { Transition } from "@headlessui/react";
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
    <SharedScreen
      leftPanel={
        <Transition
          show={true}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
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
        </Transition>
      }
      rightPanel={
        <Transition
          show={true}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {newUser ? (
            <div className="h-[82vh] flex-none overflow-y-scroll px-2">
              <NewUserForm
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                handleUser={handleUserCRUDAction}
              />
            </div>
          ) : selectedUser ? (
            <UserDetails
              selectedUser={selectedUser}
              handleSelectedUser={handleSelectUser}
              handleEditUser={handleEditUser}
              users={users}
              handleUser={handleUserCRUDAction}
            />
          ) : editUser ? (
            <div className="h-[82vh] flex-none overflow-y-scroll px-2">
              <EditUserForm
                values={userToEdit}
                handleChange={handleEditUserChange}
                handleSubmit={handleUserEditSubmit}
                errors={editUserErrors}
                handleUser={handleUserCRUDAction}
              />
            </div>
          ) : (
            <NoUsers createUser={handleNewUser} />
          )}
        </Transition>
      }
    />
  );
};
