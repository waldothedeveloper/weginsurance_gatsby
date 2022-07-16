import PropTypes from "prop-types";
import React from "react";
import { UserAddIcon } from "@heroicons/react/solid";
export const SearchUsers = ({ newUser, chat }) => (
  <div className="inline-grid w-full grid-cols-4 items-center">
    <div className={!chat ? `col-span-3 my-2` : ` col-span-4 my-2`}>
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
        placeholder="Buscar..."
      />
    </div>
    {!chat && (
      <button
        onClick={() => newUser(true)}
        type="button"
        className="items-right col-span-1 inline-flex justify-self-center p-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <UserAddIcon className="h-6 w-6 text-slate-400" />
      </button>
    )}
  </div>
);

SearchUsers.propTypes = {
  newUser: PropTypes.func,
  chat: PropTypes.bool,
};
