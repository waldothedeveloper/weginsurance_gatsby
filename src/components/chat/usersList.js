import { ModeButtons } from "./modeButtons";
import PropTypes from "prop-types";
import React from "react";
import { SearchUsers } from "../users/search";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
//
export const UsersList = ({ users, chooseParticipant }) => (
  <>
    <SearchUsers chat={true} />

    <nav aria-label="Directory">
      <ul
        role="list"
        className="relative z-0 h-[45rem] flex-none divide-y divide-gray-200 overflow-y-auto"
      >
        {users.map((person) => (
          <li key={person.id}>
            <div className="relative flex items-center space-x-3 rounded px-6 py-5 hover:bg-slate-100 focus:rounded-full">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-lg font-medium text-white">
                  {person.first_name[0]}
                  {person.lastname[0]}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <p className="text-sm font-medium text-gray-900">
                    {person.first_name} {person.lastname}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {formatPhoneNumber(person.phone)}
                  </p>
                </div>
                <ModeButtons
                  person={person}
                  chooseParticipant={chooseParticipant}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  </>
);
UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  chooseParticipant: PropTypes.func.isRequired,
};
