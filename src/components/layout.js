import Proptypes from "prop-types";
import React from "react";
export default function Layout({ children }) {
  return <div>{children}</div>;
}

Layout.propTypes = {
  children: Proptypes.node.isRequired,
};
