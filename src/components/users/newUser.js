import PropTypes from "prop-types";
import React from "react";
export const NewUser = ({ children }) => (
  <>
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Crear Nuevo Usuario
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="h-full overflow-y-auto">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

NewUser.propTypes = {
  children: PropTypes.node,
};
