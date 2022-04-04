import { LoginButton } from "../loginButton";
import React from "react";
import { render } from "@testing-library/react";

describe(`Loading Button`, () => {
  it(`the anchor element should contain the href '/auth/login'`, () => {
    const { getByText } = render(<LoginButton />);
    expect(getByText(/Entrar/i).closest(`a`)).toHaveAttribute(
      `href`,
      `/auth/login`
    );
  });
});
