import axios from "axios";

const { data } = await axios.get(
  "https://codember.dev/data/database_attacked.txt"
);

/**
  Un usuario sólo es válido si:

  - id: existe y es alfanumérica
  - username: existe y es alfanumérico
  - email: existe y es válido (sigue el patrón user@dominio.com)
  - age: es opcional pero si aparece es un número
  - location: es opcional pero si aparece es una cadena de texto
 */

/**
 * Validate if the user ID is correct
 * @param {string} id The user's id
 * @returns `true` if the id is valid, `false` otherwise
 */
const isIDValid = (id) => {
  if (!id) return false;
  const regex = /^[a-zA-Z0-9]+$/gi;
  return regex.test(id);
};

/**
 * Validate if the username is correct
 * @param {string} username The user's username
 * @returns `true` if the username is valid, `false` otherwise
 */
const isUsernameValid = (username) => {
  if (!username) return false;
  const regex = /[a-zA-Z0-9]+/gi;
  return regex.test(username);
};

/**
 * Validate if the email is correct
 * @param {string} email The user's email
 * @returns `true` if the email is valid, `false` otherwise
 */
const isEmailValid = (email) => {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.com$/gi;
  return regex.test(email);
};

/**
 * Validate if the age is correct
 * @param {string} age The user's age
 * @returns `true` if the age is valid, `false` otherwise
 */
const isAgeValid = (age) => {
  const regex = /^\d+$/gi;
  return !age || regex.test(age);
};

/**
 * Validate if the location is correct
 * @param {string} location The user's location
 * @returns `true` if the location is valid, `false` otherwise
 */
const isLocationValid = (location) => {
  const regex = /^[a-zA-Z\s]+$/gi;
  return !location || regex.test(location);
};

const invalidUsers = data
  .split("\n")
  .map((line) => {
    const [id, username, email, age, location] = line.split(",");
    return { id, username, email, age, location };
  })
  .filter(({ id, username, email, age, location }) => {
    return !(
      isIDValid(id) &&
      isUsernameValid(username) &&
      isEmailValid(email) &&
      isAgeValid(age) &&
      isLocationValid(location)
    );
  });

console.log("=== SECRET MESSAGE ===");
console.log(
  invalidUsers.reduce((msg, { username }) => (msg += username.charAt(0)), "")
);
