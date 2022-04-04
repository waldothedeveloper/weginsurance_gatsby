import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";

import { Link } from "gatsby";
import Notifications from "../notifications";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { useSignIn } from "../../hooks/authentication/useSignin";

export const LoginForm = () => {
  const {
    handleSubmit,
    error,
    email,
    password,
    handleChange,
    authErrors,
    openCloseNotification,
    setOpenCloseNotification,
  } = useSignIn();
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center justify-center">
            <StaticImage
              className="mx-auto h-24 w-24 rounded-full"
              placeholder="blurred"
              layout="constrained"
              src="../../images/weginsurance_logo.jpeg"
              alt="weginsurance logo"
            />

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Entrar a la cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Si tiene problemas para entrar contacte al soporte tecnico
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electronico
              </label>
              <div className="mt-1">
                <input
                  id="email-address"
                  value={email || ``}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={
                    error && email.length > 0
                      ? `block w-full appearance-none rounded-md border border-red-500 px-3 py-2 text-red-500 placeholder-red-500 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm`
                      : `block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm`
                  }
                />
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {error && email.length > 0 && error}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  value={password || ``}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/auth/forgot_password"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  Olvido su Contraseña?
                </Link>
              </div>
            </div>
            <div>
              <button
                disabled={(error || password.length === 0) ?? false}
                onClick={handleSubmit}
                className={
                  error || password.length === 0
                    ? `group relative flex w-full justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                    : `group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`
                }
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {error || password.length === 0 ? (
                    <LockClosedIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <LockOpenIcon
                      className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
                      aria-hidden="true"
                    />
                  )}
                </span>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      {authErrors && (
        <Notifications
          authErrors={authErrors}
          openCloseNotification={openCloseNotification}
          setOpenCloseNotification={setOpenCloseNotification}
        />
      )}
    </>
  );
};
