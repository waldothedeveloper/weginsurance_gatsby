import PropTypes from "prop-types";
import React from "react";
export const UserNotes = ({ notes }) => (
  <div className="mt-12">
    <div className="sm:col-span-2">
      <dt className="text-sm font-medium text-gray-500">Anotaciones</dt>
      <dd className="mt-1 max-w-prose space-y-5 text-sm text-gray-900">
        {notes}
      </dd>
    </div>
  </div>
);

UserNotes.propTypes = {
  notes: PropTypes.string.isRequired,
};
