import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import app from "gatsby-plugin-firebase-v9.0";
import { getFirestore } from "firebase/firestore";

export const useReadUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);
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
