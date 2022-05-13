import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import { render, screen } from "@testing-library/react";

import { Chat } from "../../components/chat/all";
import React from "react";
import { Statistics } from "../../components/statistics/all";
import { Switcher } from "../admin/switcher";
import { UsersScreen } from "../../components/users/screen";
import userEvent from "@testing-library/user-event";

//
const user = userEvent.setup();
const handleModule = jest.fn();
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
describe(`Switcher`, () => {
  it(`should render correctly`, () => {
    const { container } = render(
      <Switcher handleModule={handleModule} module={module} />
    );
    expect(container).toMatchSnapshot();
  });

  it(`should call handleModule on click`, async () => {
    render(<Switcher handleModule={handleModule} module={module} />);
    await user.click(screen.getByText(`Clientes`));
    expect(handleModule).toHaveBeenCalled();
  });
});
