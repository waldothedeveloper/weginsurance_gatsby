/* eslint-disable camelcase */
const onlyLetters = new RegExp(/^[a-zA-Z]*$/);
// us phone regex
const validatePhoneRegex = new RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);
const validateZipcodeRegex = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/);

const validateEmailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const validate = (values) => {
  let errors = {};

  const {
    first_name,
    secondary_name,
    lastname,
    second_lastname,
    email,
    phone,
    zipcode,
  } = values;

  if (!first_name) {
    errors.first_name = `El primer nombre es requerido`;
  } else if (!onlyLetters.test(first_name)) {
    errors.first_name = `El primer nombre solo puede contener letras`;
  }

  if (!onlyLetters.test(secondary_name)) {
    errors.secondary_name = `El segundo nombre solo puede contener letras`;
  }

  if (!lastname) {
    errors.lastname = `El apellido es requerido`;
  } else if (!onlyLetters.test(lastname)) {
    errors.lastname = `El apellido solo puede contener letras`;
  }

  if (!onlyLetters.test(second_lastname)) {
    errors.second_lastname = `El segundo nombre solo puede contener letras`;
  }

  if (email.length > 0 && !validateEmailRegex.test(email)) {
    errors.email = `El email no es valido`;
  }

  if (!phone) {
    errors.phone = `El telefono es requerido`;
  } else if (!validatePhoneRegex.test(phone)) {
    errors.phone = `El telefono no es valido`;
  }

  if (zipcode && zipcode.length > 0 && !validateZipcodeRegex.test(zipcode)) {
    errors.zipcode = `El codigo postal no es valido`;
  }

  return errors;
};
