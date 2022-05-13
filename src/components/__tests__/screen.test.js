import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { render, screen } from "@testing-library/react";

import { Chat } from "../../components/chat/all";
import React from "react";
import { Screen } from "../admin/screen";
import { Statistics } from "../../components/statistics/all";
import { UsersScreen } from "../../components/users/screen";

//
const module = [
  {
    name: `Dashboard`,
    icon: HomeIcon,
    current: true,
    comp: Statistics,
  },
  {
    name: `Clientes`,
    icon: UsersIcon,
    current: false,
    comp: UsersScreen,
  },
  { name: `Chat`, icon: FolderIcon, current: false, comp: Chat },
];

//
describe(`Screen`, () => {
  it(`should render correctly`, () => {
    const { container } = render(<Screen module={module} />);
    expect(container).toMatchSnapshot();
  });

  it(`should render the current module`, () => {
    render(<Screen module={module} />);
    expect(screen.getByText(/statistics/i)).toBeInTheDocument();
  });
});
