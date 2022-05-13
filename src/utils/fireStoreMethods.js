import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const updateUser = (values) => {
  if (values.refDocumentId) {
    // existing users
    const userToUpdate = doc(db, `users/${values.refDocumentId}`);
    return setDoc(userToUpdate, values);
  } else {
    throw new Error(`User does not exist`);
  }
};

export const createUser = (values) => {
  const userToCreate = addDoc(collection(db, `users`), values);
  return userToCreate;
};

export const deleteUser = (id) => {
  if (id) {
    return deleteDoc(doc(db, `users/${id}`));
  } else {
    throw new Error(`User with refDocumentId ${id} not found`);
  }
};
