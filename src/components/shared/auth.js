import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import app from "gatsby-plugin-firebase-v9.0";
import { navigate } from "gatsby";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseAuth, setFirebaseAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    if (auth) {
      setFirebaseAuth(auth);
    }
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

  const logOut = () =>
    signOut(firebaseAuth)
      .then(() => {
        navigate(`/auth/login`);
      })
      .catch((error) => {
        console.log(`error signing out: `, error);
      });

  //
  return (
    <AuthContext.Provider
      value={{ user, loading, firebaseAuth, logOut }}
      {...props}
    />
  );
};

export const useAuthState = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuthState must be used within an AuthContextProvider`);
  }
  return { ...context, isAuthenticated: context.user !== null };
};
