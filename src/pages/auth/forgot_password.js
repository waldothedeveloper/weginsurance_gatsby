import { AuthContextProvider } from "../../components/shared/auth";
import { ForgotPasswordForm } from "../../components/authentication/forgotPasswordForm";
import React from "react";
const ForgotPassword = () => (
  <AuthContextProvider>
    <ForgotPasswordForm />
  </AuthContextProvider>
);

export default ForgotPassword;
