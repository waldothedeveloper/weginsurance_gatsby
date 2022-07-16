import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import app from "gatsby-plugin-firebase-v9.0";
import { getFirestore } from "firebase/firestore";

export const useGetInsuranceCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);

    //
    const unsubscribe = onSnapshot(
      collection(db, `insurance_companies`),
      (snapshot) => {
        const arr = new Set();
        snapshot.forEach((doc) => {
          arr.add(doc.data());
        });
        setCompanies(Array.from(arr));
      }
    );

    return () => unsubscribe();
  }, []);

  return { companies };
};
