import PropTypes from "prop-types";
import React from "react";
import { SearchUsers } from "./search";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
export const UsersDictionary = ({ users, handleSelectUser, handleUser }) => (
  <>
    <SearchUsers newUser={handleUser} />

    <nav aria-label="Directory">
      <div className="relative">
        <ul
          role="list"
          className={
            users.length === 0
              ? `relative z-0 animate-pulse divide-y divide-gray-200`
              : `relative z-0 h-[45rem] divide-y divide-gray-200 overflow-y-auto`
          }
        >
          {users.map((person) => (
            <li key={person.id}>
              <div className="relative flex items-center space-x-3 rounded px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500 hover:bg-slate-100 focus:rounded-full">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-lg font-medium text-white">
                    {person.first_name[0]}
                    {person.lastname[0]}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => handleSelectUser(person)}
                    className="focus:outline-none"
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {person.first_name} {person.lastname}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {formatPhoneNumber(person.phone)}
                    </p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </>
);

UsersDictionary.propTypes = {
  users: PropTypes.array.isRequired,
  handleSelectUser: PropTypes.func,
  handleUser: PropTypes.func.isRequired,
};
