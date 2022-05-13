import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../utils/firebaseConfig";

export const useReadUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, `users`), (snapshot) => {
      const arr = new Set();
      snapshot.forEach((doc) => {
        arr.add({ ...doc.data(), refDocumentId: doc.id });
      });
      setUsers(Array.from(arr));
    });

    return () => unsubscribe();
  }, []);

  return { users };
};
