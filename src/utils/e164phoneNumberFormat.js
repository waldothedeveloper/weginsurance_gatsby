export const e164PhoneNumber = (phone) =>
  `+1${phone
    .replace(/[{()}]/g, ``)
    .replace(/\s/g, ``)
    .replace(/-/g, ``)}`;
