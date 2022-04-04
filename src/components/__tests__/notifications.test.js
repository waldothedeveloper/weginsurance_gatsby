import { render, screen } from "@testing-library/react";

import Notifications from "../notifications";
import React from "react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

//
describe(`Notifications Component`, () => {
  it(`renders the Notifications component`, () => {
    const container = render(
      <Notifications
        authErrors="Error"
        openCloseNotification={true}
        setOpenCloseNotification={() => undefined}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it(`should be unmounted when openCloseNotification is false`, () => {
    const { container, unmount } = render(
      <Notifications
        authErrors="Error"
        openCloseNotification={false}
        setOpenCloseNotification={() => false}
      />
    );

    unmount();

    expect(container).toBeEmptyDOMElement();
  });

  it(`should be unmounted when setOpenCloseNotification is clicked`, async () => {
    const { container, unmount } = render(
      <Notifications
        authErrors="Error"
        openCloseNotification={true}
        setOpenCloseNotification={() => false}
      />
    );

    const link = screen.getByTestId(`close-notification`);

    await user.click(link);

    unmount();

    expect(container).toBeEmptyDOMElement();
  });
});
