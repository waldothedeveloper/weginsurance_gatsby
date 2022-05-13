import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { app } from "../../utils/firebaseConfig";
import { navigate } from "gatsby";

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, loading }} {...props} />;
};

export const useAuthState = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuthState must be used within an AuthContextProvider`);
  }
  return { ...context, isAuthenticated: context.user !== null };
};

export const logOut = () =>
  signOut(auth)
    .then(() => {
      navigate(`/auth/login`);
    })
    .catch((error) => {
      console.log(`error signing out: `, error);
    });
