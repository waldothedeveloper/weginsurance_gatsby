import Proptypes from "prop-types";
import React from "react";
export default function Layout({ children }) {
  return <>{children}</>;
}

Layout.propTypes = {
  children: Proptypes.node.isRequired,
};
