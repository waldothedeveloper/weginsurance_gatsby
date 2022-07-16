import PropTypes from "prop-types";
import React from "react";
export const MessageForm = ({ handleChange, handleSubmit, newMessage }) => (
  <form onSubmit={handleSubmit}>
    <div className="mt-1">
      <input
        value={newMessage || ``}
        onChange={handleChange}
        type="text"
        name="name"
        id="name"
        className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
        placeholder="Jane Doe"
      />
    </div>
  </form>
);

MessageForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired,
};
