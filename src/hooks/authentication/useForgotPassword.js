import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";

import { app } from "../../utils/firebaseConfig";
import { navigate } from "gatsby";
import { validEmailRegex } from "./validateEmailHelper";

const auth = getAuth(app);
auth.languageCode = `es`;

export const useForgotPassword = () => {
  const [email, setEmail] = useState(``);
  const [error, setError] = useState(null);
  const [authErrors, setAuthErrors] = useState(``);
  const [subMissionHasErrors, setSubmissionHasErrors] = useState(false);

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
        console.log(`code: `, code);

        switch (code) {
          case `auth/user-not-found`:
            setAuthErrors(`El usuario o correo electronico no existe.`);
            setSubmissionHasErrors(true);
            break;
          default:
            setAuthErrors(
              `Ha ocurrido un error inesperado. Intentelo de nuevo mas tarde.`
            );
            setSubmissionHasErrors(true);
            break;
        }
      });
  };

  return {
    handleSubmit,
    error,
    email,
    handleChange,
    authErrors,
    subMissionHasErrors,
    setSubmissionHasErrors,
  };
};
