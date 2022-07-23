import { validEmailRegex } from "../../hooks/authentication/validateEmailHelper";

describe(`validateEmailHelper`, () => {
  it(`should return true if email is valid`, () => {
    expect(validEmailRegex.test(`test@gmail.com`)).toBe(true);
  });

  it(`should return false if email is invalid`, () => {
    expect(validEmailRegex.test(`asdq12ads12234324asdasdf@@@#!!`)).toBe(false);
  });
});
