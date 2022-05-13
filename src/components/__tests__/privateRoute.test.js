import { render, screen } from "@testing-library/react";

import { AuthContextProvider } from "../shared/auth";
import PrivateRoute from "../shared/privateRoute";
import React from "react";
import { waitFor } from "@testing-library/react";

describe(`PrivateRoute`, () => {
  it(`should render the component`, async () => {
    render(
      <AuthContextProvider>
        <PrivateRoute component={() => <div>Hello</div>} />
      </AuthContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Hello`)).toBeInTheDocument();
    });
  });

  // it(`should redirect to login page if user is not authenticated`, async () => {
  //   render(
  //     <AuthContextProvider>
  //       <PrivateRoute component={() => <div>Hello</div>} />
  //     </AuthContextProvider>
  //   );
  // });
});
