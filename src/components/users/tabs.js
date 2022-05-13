import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils/classNames";

export const UserDetailsTabs = ({ tabs, handleClick }) => (
  <div className="mt-6 sm:mt-2 2xl:mt-5">
    <div className="border-b border-gray-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleClick(tab.name)}
              className={classNames(
                tab.current
                  ? `border-pink-500 text-gray-900`
                  : `border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`,
                `whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`
              )}
              aria-current={tab.current ? `page` : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

UserDetailsTabs.propTypes = {
  handleClick: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};
