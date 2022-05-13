import { useEffect, useState } from "react";

import { createUser } from "../../utils/fireStoreMethods";
import { nanoid } from "nanoid";
import { userSchema } from "../../utils/userSchema";
import { validate } from "../../utils/userValidation";

export const useCreateUser = () => {
  const [values, setValues] = useState({ ...userSchema, id: nanoid() });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // validate errors
  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  useEffect(() => {
    // if no errors save the user
    if (Object.keys(errors).length === 0 && isSubmitting) {
      createUser(values).then(() => {
        const id = nanoid();
        const schema = userSchema;
        schema.id = id;
        setErrors({});
        setValues(schema);
      });
    }
    setIsSubmitting(false);
  }, [errors, isSubmitting, values]);

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      setValues({ ...values, [name]: value });
    } else {
      setValues({ ...values, insurance_company: event });
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return { values, handleChange, handleSubmit, errors };
};
