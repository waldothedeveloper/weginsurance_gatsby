import { render, screen } from "@testing-library/react";

import LandingPage from "../landingPage";
import React from "react";
import { navigate } from "gatsby";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

jest.mock(`gatsby-plugin-image`, () => {
  const React = require(`react`);
  const plugin = jest.requireActual(`gatsby-plugin-image`);

  const mockImage = ({ imgClassName, ...props }) =>
    React.createElement(`img`, { ...props, className: imgClassName });

  const mockPlugin = {
    ...plugin,
    GatsbyImage: jest.fn().mockImplementation(mockImage),
    StaticImage: jest.fn().mockImplementation(mockImage),
  };

  return mockPlugin;
});

describe(`LandingPage`, () => {
  it(`renders correctly`, () => {
    const container = render(<LandingPage />);
    expect(container).toMatchSnapshot();
  });

  it(`navigates to /auth/login when Gatsby Link (anchor) is clicked`, async () => {
    render(<LandingPage />);

    await user.click(screen.getAllByText(/Entrar al sistema/i)[0]);

    await navigate(`/auth/login`);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(`/auth/login`);
  });
});
