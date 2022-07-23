import { Loader } from "../shared/loader";
import React from "react";
import { render } from "@testing-library/react";

describe(`Loader`, () => {
  it(`should render the Loader component`, () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
