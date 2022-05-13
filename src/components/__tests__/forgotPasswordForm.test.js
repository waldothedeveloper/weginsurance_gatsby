import { render, screen } from "@testing-library/react";

// import EmailSentSuccessfully from "../../pages/auth/emailSentSuccessfully";
import { ForgotPasswordForm } from "../authentication/forgotPasswordForm";
import React from "react";
import { navigate } from "gatsby";
import userEvent from "@testing-library/user-event";

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

const user = userEvent.setup();

describe(`Forgot Password Form`, () => {
  it(`renders correctly`, () => {
    const container = render(<ForgotPasswordForm />);

    expect(container).toMatchSnapshot();
  });

  it(`submit button should be disabled if there's the input field is blank`, () => {
    render(<ForgotPasswordForm />);
    const submitButton = screen.getByTestId(`submit-button`);

    expect(submitButton).toBeDisabled();
  });

  it(`submit button should be disabled if an invalid email is typed`, async () => {
    render(<ForgotPasswordForm />);
    const inputField = screen.getByTestId(`email-address`);
    await user.type(inputField, `some invalid email`);
    const submitButton = screen.getByTestId(`submit-button`);

    expect(submitButton).toBeDisabled();
  });

  it(`Submit button should NOT be disabled if a valid email address is used`, async () => {
    render(<ForgotPasswordForm />);
    const button = screen.getByTestId(`submit-button`);
    const inputEl = screen.getByTestId(`email-address`);
    await user.type(inputEl, `test2@gmail.com`);

    expect(inputEl.value).toBe(`test2@gmail.com`);
    expect(button).toBeEnabled();
  });

  it(`navigates back to /auth/login when Gatsby Link (anchor) is clicked`, async () => {
    render(<ForgotPasswordForm />);
    const link = screen.getByTestId(`sign-in-link`);

    await user.click(link);
    await navigate(`/auth/login`);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(`/auth/login`);
  });
});
