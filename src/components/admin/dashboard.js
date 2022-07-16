import { BellIcon, MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Profile } from "./profile";
import React from "react";
import { Screen } from "./screen";
import { Search } from "./search";
import { StaticImage } from "gatsby-plugin-image";
import { Switcher } from "./switcher";
import { useSwitcher } from "../../hooks/dashboard/useSwitcher";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { module, handleModuleSwitch } = useSwitcher();

  return (
    <div className="flex h-screen min-h-screen flex-col">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-sky-700 pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center justify-center px-4">
                <StaticImage
                  placeholder="blurred"
                  layout="fullWidth"
                  className="h-20 w-20 rounded-full"
                  src="../../images/weginsurance_logo.jpeg"
                  alt="girl smiling representing a bright future for the weginsurance's company"
                />
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  <Switcher handleModule={handleModuleSwitch} module={module} />
                </nav>
              </div>
            </div>
          </Transition.Child>
          {/* Dummy element to force sidebar to shrink to fit close icon */}
          <div className="w-14 flex-shrink-0" aria-hidden="true" />
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-sky-700 pt-5">
          <div className="flex flex-shrink-0 items-center justify-center px-4">
            <StaticImage
              placeholder="blurred"
              layout="fullWidth"
              className="h-20 w-20 rounded-full"
              src="../../images/weginsurance_logo.jpeg"
              alt="weginsurance logo"
            />
          </div>
          <div className="mt-5 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              <Switcher handleModule={handleModuleSwitch} module={module} />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-40 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <Search />
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Profile />
            </div>
          </div>
        </div>

        {/* render screen component here */}
        <Screen module={module} />
      </div>
    </div>
  );
};

export default Dashboard;
