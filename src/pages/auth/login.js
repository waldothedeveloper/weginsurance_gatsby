import { AuthContextProvider } from "../../components/shared/auth";
import { LoginForm } from "../../components/authentication/loginForm";
import React from "react";

const Login = () => (
  <AuthContextProvider>
    <LoginForm />
  </AuthContextProvider>
);
export default Login;
