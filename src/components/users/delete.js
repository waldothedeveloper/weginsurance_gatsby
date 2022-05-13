import PropTypes from "prop-types";
import React from "react";
import { TrashIcon } from "@heroicons/react/solid";

export const DeleteUser = ({ openModal }) => (
  <span className="group">
    <button
      onClick={() => openModal(true)}
      type="button"
      className="inline-flex justify-center rounded-md border border-red-500 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-red-500/50 hover:shadow-red-700/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group-hover:bg-red-700 group-hover:text-white"
    >
      <TrashIcon
        className="-ml-1 mr-2 h-5 w-5 text-white group-hover:text-white"
        aria-hidden="true"
      />
      <span>Eliminar</span>
    </button>
  </span>
);

DeleteUser.propTypes = {
  openModal: PropTypes.func.isRequired,
};
