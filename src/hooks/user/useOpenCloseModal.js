import { useState } from "react";

export const useOpenCloseModal = () => {
  const [openUserDeleteModal, setOpenUserDeleteModal] = useState(false);

  const handleOpenCloseModal = (bool) => setOpenUserDeleteModal(bool);

  return { openUserDeleteModal, handleOpenCloseModal };
};
