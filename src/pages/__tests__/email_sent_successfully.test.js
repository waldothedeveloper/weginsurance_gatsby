import { render, screen } from "@testing-library/react";

import EmailSentSuccessfully from "../auth/email_sent_successfully";
import React from "react";
import { navigate } from "gatsby";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
//
describe(`Email sent successfully`, () => {
  it(`Should render fallback UI if email is not provided`, () => {
    const container = render(
      <EmailSentSuccessfully location={{ state: { email: undefined } }} />
    );

    expect(container).toMatchSnapshot();
  });

  it(`should navigate back home  when Gatsby Link (anchor) is clicked`, () => {
    render(
      <EmailSentSuccessfully
        location={{ state: { email: `email not provided` } }}
      />
    );
    const link = screen.getByTestId(`back-to-home`);

    expect(link).toHaveAttribute(`href`, `/`);
  });

  it(`should render 200 number when valid email is provided`, () => {
    const { getByText } = render(
      <EmailSentSuccessfully
        location={{ state: { email: `test@gmail.com` } }}
      />
    );

    expect(getByText(`200`)).toBeInTheDocument();
  });

  it(`should navigate to gmail provider if Gatsby Link (anchor) is clicked`, async () => {
    render(
      <EmailSentSuccessfully
        location={{ state: { email: `test@gmail.com` } }}
      />
    );
    const link = screen.getByTestId(`gmail-link`);
    await user.click(link);
    await navigate(`https://mail.google.com/mail/u/0/#inbox`);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      `https://mail.google.com/mail/u/0/#inbox`
    );
  });
});
