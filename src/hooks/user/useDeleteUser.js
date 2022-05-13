import { deleteUser } from "../../utils/fireStoreMethods";

export const useDeleteUser = () => {
  //
  const handleDeleteUser = (id, handleUser, setOpen) =>
    deleteUser(id)
      .then(() => {
        setOpen(false);
        handleUser();
      })
      .catch((err) => console.log(`Error deleting user: ${err}`));

  return { handleDeleteUser };
};
