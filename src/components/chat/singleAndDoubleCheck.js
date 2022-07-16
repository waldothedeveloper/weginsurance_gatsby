import { CheckIcon } from "@heroicons/react/outline";
import React from "react";

export const SingleCheck = () => (
  <span className="justify-cente flex items-center">
    <CheckIcon className="h-5 w-5 text-yellow-400" />
  </span>
);

export const DoubleCheck = () => (
  <span className="flex items-center justify-center">
    <CheckIcon className="h-5 w-5 text-yellow-400" />
    <CheckIcon className="-ml-4 mt-1 h-5 w-5 text-yellow-400" />
  </span>
);
