import React from "react";
import propTypes from "prop-types";
export const SharedScreen = ({
  rightPanel: RightPanel,
  leftPanel: LeftPanel,
}) => (
  <div className="z-0 mx-auto grid grid-cols-12 gap-8 px-6">
    <div className="col-span-4 h-full rounded-lg border-2 border-solid border-gray-100 py-6 lg:px-4">
      {LeftPanel}
    </div>
    <div className="col-span-8 h-full rounded-lg border-2 border-solid border-gray-100 pt-6 lg:px-1">
      {RightPanel}
    </div>
  </div>
);

SharedScreen.propTypes = {
  rightPanel: propTypes.node.isRequired,
  leftPanel: propTypes.node.isRequired,
};
