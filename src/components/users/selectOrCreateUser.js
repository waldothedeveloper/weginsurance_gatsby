import { PlusIcon, UserGroupIcon } from "@heroicons/react/solid";

import PropTypes from "prop-types";
import React from "react";

export const SelectOrCreateUser = ({ handleUser }) => (
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <UserGroupIcon className="mx-auto h-12 w-12 text-slate-400" />

      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Seleccione un usuario
      </h3>
      <p className="mt-1 text-sm text-gray-500">o tambien puede</p>
      <div className="mt-6">
        <button
          onClick={handleUser}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Crear Nuevo Usuario
        </button>
      </div>
    </div>
  </div>
);

SelectOrCreateUser.propTypes = {
  handleUser: PropTypes.func.isRequired,
};
