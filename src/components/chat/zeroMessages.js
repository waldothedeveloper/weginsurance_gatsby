import { AnnotationIcon } from "@heroicons/react/outline";
import React from "react";
export const ZeroMessages = () => (
  <div className="relative block w-full rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <AnnotationIcon className="mx-auto h-12 w-12 text-gray-400" />

    <span className="mt-2 block text-sm font-medium text-gray-900">
      No hay mensajes aun para este usuario.
      <br /> Envie un mensaje para comenzar.
    </span>
  </div>
);
