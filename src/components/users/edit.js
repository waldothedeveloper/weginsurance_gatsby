import { PencilIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import React from "react";
export const EditUser = ({ handleEditUser }) => (
  <span className="group">
    <button
      onClick={() => handleEditUser(true)}
      type="button"
      className="group inline-flex justify-center rounded-md border border-sky-300 bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/50 hover:shadow-sky-600/50 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 group-hover:bg-sky-600 group-hover:text-white"
    >
      <PencilIcon
        className="-ml-1 mr-2 h-5 w-5 text-white group-hover:text-white"
        aria-hidden="true"
      />
      <span>Editar</span>
    </button>
  </span>
);

EditUser.propTypes = {
  handleEditUser: PropTypes.func.isRequired,
};
