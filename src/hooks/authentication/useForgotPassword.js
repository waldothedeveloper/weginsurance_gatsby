import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";

import { app } from "../../utils/firebaseConfig";
import { navigate } from "gatsby";
import { validEmailRegex } from "./validateEmailHelper";

const auth = getAuth(app);
auth.languageCode = `es`;

export const useForgotPassword = () => {
  const [email, setEmail] = useState(``);
  const [validationErrors, setValidationErrors] = useState(null);
  const [authErrors, setAuthErrors] = useState(``);

  useEffect(() => {
    if (!validEmailRegex.test(email)) {
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
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    //
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        navigate(`/auth/email_sent_successfully`, { state: { email: email } });
      })
      .catch((error) => {
        const { code } = error;

        switch (code) {
          case `auth/user-not-found`:
            setAuthErrors(() => `El usuario o correo electronico no existe.`);
            break;
          default:
            setAuthErrors(
              () =>
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
    handleChange,
    authErrors,
    setAuthErrors,
  };
};
