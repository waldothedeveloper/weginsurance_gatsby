import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import app from "gatsby-plugin-firebase-v9.0";
import { getFirestore } from "firebase/firestore";

export const useUpdateUser = () => {
  const db = getFirestore(app);

  const updateUser = (values) => {
    if (values.refDocumentId) {
      // existing users
      const userToUpdate = doc(db, `users/${values.refDocumentId}`);
      return updateDoc(userToUpdate, values);
    } else {
      throw new Error(`User does not exist`);
    }
  };

  return { updateUser };
};

export const useCreateUserInDB = () => {
  const db = getFirestore(app);

  const createUser = (values) => {
    const userToCreate = addDoc(collection(db, `users`), values);
    return userToCreate;
  };

  return { createUser };
};

export const useDeleteUserInDB = () => {
  const db = getFirestore(app);

  const deleteUser = (id) => {
    if (id) {
      return deleteDoc(doc(db, `users/${id}`));
    } else {
      throw new Error(`User with refDocumentId ${id} not found`);
    }
  };

  return { deleteUser };
};
