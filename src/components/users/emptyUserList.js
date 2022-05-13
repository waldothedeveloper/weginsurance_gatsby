import PropTypes from "prop-types";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { UserAddIcon } from "@heroicons/react/solid";

export const EmptyUserList = ({ createUser }) => (
  <div>
    <div className="inline-grid w-full grid-cols-4 items-center">
      <div className="col-span-3 my-2">
        <input
          disabled
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-full border-slate-100 bg-slate-100 px-4 shadow-sm sm:text-sm"
        />
      </div>
      <button
        onClick={() => createUser(true)}
        type="button"
        className="items-right col-span-1 inline-flex justify-self-center p-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <UserAddIcon className="h-6 w-6 text-slate-700" />
      </button>
    </div>

    <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <StaticImage
        placeholder="blurred"
        layout="fullWidth"
        transformOptions={{ fit: `cover` }}
        className="mt-20"
        src="../../images/no-messages.png"
        alt="Space man"
      />
      <div className="mt-16 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-600">
          WEG INSURANCE
        </h2>
        <p className="mt-1 text-3xl font-extrabold text-slate-900 sm:tracking-tight lg:text-4xl">
          No hay usuarios creados.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-base text-slate-500">
          Comience por crear algunos usuarios para que pueda enviar mensajes
          SMS.
        </p>
      </div>
    </div>
  </div>
);

EmptyUserList.propTypes = {
  createUser: PropTypes.func.isRequired,
};
