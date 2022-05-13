import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

import { app } from "../../utils/firebaseConfig";
import { navigate } from "gatsby";
import { validEmailRegex } from "./validateEmailHelper";

const auth = getAuth(app);

export const useSignIn = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [validationErrors, setValidationErrors] = useState(null);
  const [signInErrors, setSignInErrors] = useState(``);

  useEffect(() => {
    if (email.length > 0 && !validEmailRegex.test(email)) {
      setValidationErrors(
        `El correo electronico debe contener un formato valido`
      );
    } else {
      setValidationErrors(``);
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
        navigate(`/admin/dashboard`);
      })
      .catch((error) => {
        const { code } = error;
        // console.log(`code: `, code);

        switch (code) {
          case `auth/wrong-password`:
            setSignInErrors(`La contraseña es incorrecta.`);

            break;
          case `auth/user-not-found`:
            setSignInErrors(`El usuario es incorrecto o no existe.`);

            break;
          case `auth/too-many-requests`:
            setSignInErrors(
              `Demasiados intentos fallidos, intente de nuevo mas tarde.`
            );

            break;
          case `auth/invalid-password`:
            setSignInErrors(
              `La contraseña es muy corta. Debe contener al menos 6 caracteres.`
            );

            break;
          default:
            setSignInErrors(
              `Ha ocurrido un error inesperado. Intentelo de nuevo mas tarde.`
            );

            break;
        }
      });
  };

  return {
    handleSubmit,
    validationErrors,
    email,
    password,
    handleChange,
    signInErrors,
    setSignInErrors,
  };
};
