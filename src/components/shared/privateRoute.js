import { Loader } from "./loader";
import PropTypes from "prop-types";
import React from "react";
import { isBrowser } from "../../utils/firebaseConfig";
import { navigate } from "gatsby";
import { useAuthState } from "../shared/auth";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { loading, isAuthenticated } = useAuthState();

  if (isBrowser && !isAuthenticated && !loading) {
    navigate(`/auth/login`);
  }

  if (loading) {
    return <Loader />;
  } else {
    return <Component {...props} />;
  }
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  component: PropTypes.any,
};
