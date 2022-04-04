import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

import { app } from "../../utils/firebaseConfig";
import { validEmailRegex } from "./validateEmailHelper";

const auth = getAuth(app);

export const useSignIn = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(null);
  const [authErrors, setAuthErrors] = useState(``);
  const [openCloseNotification, setOpenCloseNotification] = useState(false);

  useEffect(() => {
    if (!validEmailRegex.test(email)) {
      setError(`El correo electronico debe contener un formato valido`);
    } else {
      setError(``);
    }
  }, [email]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === `email`) {
      setEmail(value);
    }
    if (name === `password`) setPassword(value);
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(`user: `, user);
        // ! redirect to admin page
      })
      .catch((error) => {
        const { code } = error;
        // console.log(`code: `, code);

        switch (code) {
          case `auth/wrong-password`:
            setAuthErrors(`La contraseña es incorrecta.`);
            setOpenCloseNotification(true);
            break;
          case `auth/user-not-found`:
            setAuthErrors(`El usuario es incorrecto o no existe.`);
            setOpenCloseNotification(true);
            break;
          case `auth/too-many-requests`:
            setAuthErrors(
              `Demasiados intentos fallidos, intente de nuevo mas tarde.`
            );
            setOpenCloseNotification(true);
            break;
          case `auth/invalid-password`:
            setAuthErrors(
              `La contraseña es muy corta. Debe contener al menos 6 caracteres.`
            );
            setOpenCloseNotification(true);
            break;
          default:
            setAuthErrors(
              `Ha ocurrido un error inesperado. Intentelo de nuevo mas tarde.`
            );
            setOpenCloseNotification(true);
            break;
        }
      });
  };

  return {
    handleSubmit,
    error,
    email,
    password,
    handleChange,
    authErrors,
    openCloseNotification,
    setOpenCloseNotification,
  };
};
