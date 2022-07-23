import React, { useEffect, useState } from "react";

import { Chat } from "../chat/index";
import PropTypes from "prop-types";
import { Statistics } from "../statistics/all";
import { UsersScreen } from "../users/index";

const Skeleton = ({ children }) => <main className="py-10">{children}</main>;

export const Screen = ({ module }) => {
  const [componentToRender, setComponentToRender] = useState(`Dashboard`);

  useEffect(() => {
    const currentModule = module.filter((item) => item.current)[0].name;
    setComponentToRender(currentModule);
  }, [module]);

  switch (componentToRender) {
    case `Dashboard`:
      return (
        <Skeleton>
          <Statistics />
        </Skeleton>
      );
    case `Clientes`:
      return (
        <Skeleton>
          <UsersScreen />
        </Skeleton>
      );
    case `Chat`:
      return (
        <Skeleton>
          <Chat />
        </Skeleton>
      );
    default:
      return (
        <Skeleton>
          <Statistics />
        </Skeleton>
      );
  }
};

Screen.propTypes = {
  module: PropTypes.array.isRequired,
};

Skeleton.propTypes = {
  children: PropTypes.node.isRequired,
};
