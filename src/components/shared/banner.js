import {
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

import { Fragment } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { classNames } from "../../utils/classNames";

//
const notificationType = {
  error: `relative bg-red-500`,
  info: `relative bg-yellow-500`,
  success: `relative bg-sky-500`,
};
export const Banner = ({ type = null, message, dismissMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setIsOpen(true);
      // ! think about this
      // setTimeout(() => {
      //   setIsOpen(false);
      // }, 12000);
    }
  }, [message]);

  //
  return (
    type !== null && (
      <Transition
        data-testid="banner"
        show={isOpen}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={notificationType[type]}>
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:px-16 sm:text-center">
              <p className="flex items-center justify-center font-medium text-white">
                {type !== `info` ? (
                  <ExclamationCircleIcon
                    className="mr-1 h-6 w-6 text-red-50"
                    aria-hidden="true"
                  />
                ) : (
                  <ExclamationIcon
                    className="mr-1 h-6 w-6 text-yellow-50"
                    aria-hidden="true"
                  />
                )}
                <span className="inline">{message}</span>
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
              <button
                data-testid="dismiss-button"
                onClick={() => {
                  dismissMessage(``);
                  setIsOpen(false);
                }}
                type="button"
                className={classNames(
                  type === `info`
                    ? `hover:bg-yellow-700`
                    : type === `error`
                    ? `hover:bg-red-700`
                    : `hover:bg-sky-700`,
                  `flex rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white`
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    )
  );
};
Banner.propTypes = {
  type: PropTypes.oneOf([`error`, `info`, `success`, null]),
  message: PropTypes.string,
  dismissMessage: PropTypes.func,
};
