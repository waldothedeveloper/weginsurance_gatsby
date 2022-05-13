import { PlusIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import React from "react";
import users from "../../images/undraw_people.svg";
export const NoUsers = ({ createUser }) => (
  <div className="flex h-full items-center justify-center text-center">
    <div className="mx-auto flex max-w-xs flex-col">
      <img
        src={users}
        alt="users"
        className="h-full w-full rounded-full object-cover shadow-lg"
      />

      <h3 className="mt-12 text-sm font-medium text-gray-900">
        Detalles de Usuario
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Seleccione un usuario de la lista o cree uno nuevo.
      </p>
      <div className="mt-6">
        <button
          onClick={() => createUser(true)}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/50 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Crear Nuevo Usuario
        </button>
      </div>
    </div>
  </div>
);

NoUsers.propTypes = {
  createUser: PropTypes.func.isRequired,
};
