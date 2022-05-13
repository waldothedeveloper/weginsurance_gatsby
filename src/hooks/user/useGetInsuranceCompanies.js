import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../utils/firebaseConfig";
export const useGetInsuranceCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
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
