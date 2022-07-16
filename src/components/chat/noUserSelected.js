import React from "react";
import { UserIcon } from "@heroicons/react/outline";
export const NoUserSelected = () => (
  <div className="relative block w-full rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <UserIcon className="mx-auto h-12 w-12 text-gray-400" />

    <span className="mt-2 block text-sm font-medium text-gray-900">
      Seleccione un usuario de la lista para comenzar.
    </span>
  </div>
);
