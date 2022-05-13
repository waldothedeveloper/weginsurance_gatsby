import { AuthContextProvider } from "../components/shared/auth";
import Dashboard from "../components/admin/dashboard";
import LandingPage from "../components/landingPage";
import Layout from "../components/layout";
import PrivateRoute from "../components/shared/privateRoute";
import React from "react";
import { Router } from "@reach/router";

const Admin = () => (
  <Layout>
    <AuthContextProvider>
      <Router basepath="/admin">
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <LandingPage default />
      </Router>
    </AuthContextProvider>
  </Layout>
);
export default Admin;
