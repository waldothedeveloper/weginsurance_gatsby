import ProTypes from "prop-types";
import React from "react";
export const FormError = ({ children }) => (
  <p className="mt-2 text-sm text-red-600" id="email-error">
    {children}
  </p>
);

FormError.propTypes = {
  children: ProTypes.string.isRequired,
};
