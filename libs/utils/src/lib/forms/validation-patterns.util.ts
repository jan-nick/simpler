export const specialCharacterRegExp = /(?=.*?[#?!@$ %^&*-])/;
export const upperCaseLetterRegExp = /(?=.*?[A-Z])/;
export const lowerCaseLetterRegExp = /(?=.*?[a-z])/;
export const digitRegExp = /(?=.*?[0-9])/;
export const minCharactersRegExp = /.{10,}/;

/**  One upper case, one lower case, one digit, min. 10 characters. */
export const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$/;
