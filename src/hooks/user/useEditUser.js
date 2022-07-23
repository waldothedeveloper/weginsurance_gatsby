import { useEffect, useState } from "react";

import { useUpdateUser } from "../../utils/fireStoreMethods";
import { validate } from "../../utils/userValidation";

//
export const useEditUser = (selectedUser, handleUpdatedUser) => {
  const [userToEdit, setUserToEdit] = useState({});
  const [editUserErrors, setEditUserErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useUpdateUser();

  // watch out for when the user is selected
  useEffect(() => {
    if (selectedUser) {
      setUserToEdit(selectedUser);
    }
  }, [selectedUser]);

  // validate editUserErrors
  useEffect(() => {
    if (Object.keys(userToEdit).length > 0) {
      setEditUserErrors(validate(userToEdit));
    }
  }, [userToEdit]);

  useEffect(() => {
    // if no errors you can save the user
    if (Object.keys(editUserErrors).length === 0 && isSubmitting) {
      updateUser(userToEdit).then(() => {
        handleUpdatedUser(userToEdit);
        // setUserToEdit({});
        // setEditUserErrors({});
      });
    }
    setIsSubmitting(false);
  }, [editUserErrors, isSubmitting, userToEdit, handleUpdatedUser, updateUser]);

  const handleEditUserChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      setUserToEdit({ ...userToEdit, [name]: value });
    } else {
      setUserToEdit({ ...userToEdit, insurance_company: event });
    }
  };

  const handleUserEditSubmit = (event) => {
    if (event) event.preventDefault();
    setEditUserErrors(validate(userToEdit));
    setIsSubmitting(true);
  };

  return {
    userToEdit,
    editUserErrors,
    handleEditUserChange,
    handleUserEditSubmit,
  };
};
