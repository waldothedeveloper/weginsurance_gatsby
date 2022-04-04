import { Link } from "gatsby";
import React from "react";

export const LoginButton = () => (
  <Link
    data-testid="login-button"
    to="/auth/login"
    className="block max-w-fit rounded-md border border-transparent bg-sky-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:px-10 md:max-w-md"
  >
    Entrar al sistema
  </Link>
);
