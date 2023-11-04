/**
    - Es una contraseña de 5 dígitos.
    - La contraseña tenía el número 5 repetido como mínimo dos veces.
    - El número a la derecha siempre es mayor o igual que el que tiene a la izquierda.
    - El password está entre los números 11098 y 98123. 
*/
function answer() {
  const possiblePasswords = [];
  for (let number = 11098; number <= 98123; number++) {
    const stringNumber = number.toString();
    if (numberWith5Repeated(stringNumber) && prevNumberisMoreOrEqualsToCurrent(stringNumber)) {
      // push possible password
      possiblePasswords.push(number);
    }
  }

  console.log("=== POSSIBLE PASSWORDS ===");
  console.log({ possiblePasswords, length: possiblePasswords.length });
  console.log("=== 55 NUMBER ===");
  console.log(possiblePasswords[55]);
}

/**
 * Function to know if the number 5 is repeated two or more times in the curent number
 * @param {String} number The current number
 * @returns `true` if the number 5 is repeated two or more times, `false` otherwise
 */
function numberWith5Repeated(number) {
  const regex = /[5]/gi;
  const result = number.match(regex);
  return result && result.length >= 2;
}

/**
 * Function to know if the digit's number are in asc order
 * @param {String} number The current number
 * @returns `true` if the digits of the number are in asc order, `false` otherwise
 */
function prevNumberisMoreOrEqualsToCurrent(number) {
  const numbers = number.split("");
  for (let idx = 1; idx < numbers.length; idx++) {
    const currentNum = parseInt(numbers[idx]);
    const prevNum = parseInt(numbers[idx - 1]);
    if (currentNum < prevNum) return false;
  }
  return true;
}

answer();
