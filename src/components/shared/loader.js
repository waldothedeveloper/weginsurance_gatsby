import React from "react";

export const Loader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="animate-pulse text-base font-bold uppercase tracking-wide text-sky-600">
            Cargando...
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-sky-900 sm:tracking-tight">
            Un momento por favor
          </p>
          <svg
            className="mx-auto mt-5 h-8 w-8 max-w-xl animate-spin text-sky-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
);
