import React, { Fragment } from "react";

import { DetailsProfileHeader } from "./detailsProfileHeader";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { UserDetailsTabs } from "./tabs";
import { UserScreenDetails } from "./detailScreen";
import { useUserDetailsTabs } from "../../hooks/user/useUserDetailsTabs";

export const UserDetails = ({
  selectedUser,
  handleSelectedUser,
  handleEditUser,
  handleUser,
}) => {
  const { currentTab, handleTabClick } = useUserDetailsTabs();

  return (
    <Transition
      show={true}
      as={Fragment}
      enter="transition-opacity duration-300 ease-in"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <article className="h-[75vh] flex-none">
        {/* Profile header */}
        <DetailsProfileHeader
          currUser={selectedUser}
          handleSelectedUser={handleSelectedUser}
          handleEditUser={handleEditUser}
          handleUser={handleUser}
        />

        {/* Tabs */}
        <UserDetailsTabs handleClick={handleTabClick} tabs={currentTab} />
        {/* Description list */}
        <UserScreenDetails
          tab={currentTab}
          currentSelectedUser={selectedUser}
        />
      </article>
    </Transition>
  );
};

UserDetails.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  handleSelectedUser: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleUser: PropTypes.func.isRequired,
};
