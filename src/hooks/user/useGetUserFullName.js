import { useEffect, useState } from "react";

export const useGetUserFullName = (currUser) => {
  const [name, setName] = useState(currUser.name || ``);
  const [nameInitials, setNameInitials] = useState(currUser.nameInitials || ``);

  useEffect(() => {
    if (currUser) {
      setName(`${currUser.first_name} ${currUser.lastname}`);
      setNameInitials(`${currUser.first_name[0]}${currUser.lastname[0]}`);
    }

    return () => {
      setName(``);
      setNameInitials(``);
    };
  }, [currUser]);

  return { name, nameInitials };
};
