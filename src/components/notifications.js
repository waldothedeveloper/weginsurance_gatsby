import { Fragment } from "react";
import PropTypes from "prop-types";
import React from "react";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

const variants = {
  open: { scale: [0.9, 1, 0.9] },
  hidden: { opacity: 0 },
};

const Notifications = ({
  authErrors: errors,
  openCloseNotification: open,
  setOpenCloseNotification: setOpen,
}) => (
  <>
    {/* Global notification live region, render this permanently at the end of the document */}
    <div
      data-testid="notifications"
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={open}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <motion.div
            animate={open ? `open` : `hidden`}
            variants={variants}
            transition={{
              ease: `easeOut`,
              duration: 0.2,
              repeat: 2,
              repeatType: `loop`,
            }}
            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldExclamationIcon
                    className="h-6 w-6 text-red-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-red-500">Error!</p>
                  <p className="mt-1 text-sm text-red-500">{errors}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    data-testid="close-notification"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </Transition>
      </div>
    </div>
  </>
);

export default Notifications;
Notifications.propTypes = {
  authErrors: PropTypes.string.isRequired,
  openCloseNotification: PropTypes.bool.isRequired,
  setOpenCloseNotification: PropTypes.func.isRequired,
};
