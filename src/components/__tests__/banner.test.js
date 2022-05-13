import { render, screen } from "@testing-library/react";

import { Banner } from "../shared/banner";
import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

//
const user = userEvent.setup();

//
describe(`Banner`, () => {
  it(`should render correctly`, () => {
    const { container } = render(
      <Banner
        type="error"
        message="Error message"
        dismissMessage={() => false}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should render information message if type = info`, () => {
    render(
      <Banner
        type="info"
        message="Error message"
        dismissMessage={() => false}
      />
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it(`should not render if type is null or undefined`, () => {
    render(<Banner type={undefined} message="" dismissMessage={() => false} />);

    expect(screen.queryByTestId(`banner`)).not.toBeInTheDocument();
  });

  it(`should close when dismiss button is clicked`, async () => {
    const dismissMessage = jest.fn();
    render(
      <Banner
        type="error"
        message="Error message"
        dismissMessage={dismissMessage}
      />
    );

    const dismissButton = screen.queryByTestId(`dismiss-button`);
    await user.click(dismissButton);

    await waitFor(() => {
      expect(dismissMessage).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByTestId(`banner`)).not.toBeInTheDocument();
    });
  });
});
