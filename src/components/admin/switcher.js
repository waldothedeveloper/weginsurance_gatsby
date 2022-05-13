import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils/classNames";

export const Switcher = ({ handleModule, module }) => (
  <>
    {module.map((item) => (
      <button
        key={item.name}
        onClick={() => handleModule(item.name)}
        className={classNames(
          item.current
            ? `bg-sky-800 text-white`
            : `text-white hover:bg-sky-600`,
          `group flex w-full items-center rounded-md px-2 py-2 text-base font-medium`
        )}
      >
        <item.icon
          className="mr-4 h-6 w-6 flex-shrink-0 text-sky-300"
          aria-hidden="true"
        />
        {item.name}
      </button>
    ))}
  </>
);

Switcher.propTypes = {
  handleModule: PropTypes.func.isRequired,
  module: PropTypes.array.isRequired,
};
