import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { UserAddIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";

export const UserScreenLoader = ({ chat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const idArray = [];

    for (let i = 0; i < 20; i++) {
      idArray.push({ id: nanoid() });
    }
    setUsers(idArray);
  }, []);

  return (
    <div className="animate-pulse">
      <div className="inline-grid w-full grid-cols-4 items-center">
        <div className={!chat ? `col-span-3 my-2` : ` col-span-4 my-2`}>
          <input
            disabled
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-full border-slate-600 bg-slate-600 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>
        {!chat && (
          <button
            disabled={true}
            type="button"
            className="items-right col-span-1 inline-flex justify-self-center p-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <UserAddIcon className="h-6 w-6 text-slate-600" />
          </button>
        )}
      </div>
      <nav aria-label="Directory">
        <ul
          role="list"
          className="h-full w-full animate-pulse divide-y divide-gray-200 overflow-y-auto"
        >
          {users.map((data) => (
            <li key={data.id}>
              <div className="flex items-center space-x-2 px-6 py-5">
                <div className="h-12 w-12 rounded-full bg-slate-600"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-1 h-2 rounded bg-slate-600"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 h-2 rounded bg-slate-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

UserScreenLoader.propTypes = {
  chat: PropTypes.bool,
};
