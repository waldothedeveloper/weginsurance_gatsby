import React from "react";
import { XCircleIcon } from "@heroicons/react/solid";

export const Error = () => (
  <div className="relative flex w-full flex-col items-center justify-center p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
    <XCircleIcon className="h-12 w-12 text-red-400" aria-hidden="true" />

    <span className="mt-2 block text-sm font-medium text-red-500">
      Error del sistema.
      <br /> Intentelo nuevamente.
    </span>
  </div>
);
