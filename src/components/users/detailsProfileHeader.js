import { ConfirmUserDelete } from "./confirmDelete";
import { DeleteUser } from "./delete";
import { EditUser } from "./edit";
import PropTypes from "prop-types";
import React from "react";
import { useGetUserFullName } from "../../hooks/user/useGetUserFullName";
import { useOpenCloseModal } from "../../hooks/user/useOpenCloseModal";

export const DetailsProfileHeader = ({
  currUser,
  handleEditUser,
  handleUser,
}) => {
  const { openUserDeleteModal, handleOpenCloseModal } = useOpenCloseModal();
  const { name, nameInitials } = useGetUserFullName(currUser);

  return (
    <div className="mt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-4xl font-semibold text-white">
            {nameInitials}
          </div>
          {/* <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={currentSelectedUser.imageUrl}
                  alt=""
                /> */}
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {name}
              </h1>
            </div>
            <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <DeleteUser openModal={handleOpenCloseModal} />
              <EditUser handleEditUser={handleEditUser} />
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{name}</h1>
        </div>
      </div>
      <ConfirmUserDelete
        open={openUserDeleteModal}
        setOpen={handleOpenCloseModal}
        id={currUser.refDocumentId}
        handleUser={handleUser}
      />
    </div>
  );
};

DetailsProfileHeader.propTypes = {
  currUser: PropTypes.object.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleUser: PropTypes.func.isRequired,
};
