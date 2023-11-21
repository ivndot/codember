import axios from "axios";
/**
 * "#" Incrementa el valor numérico en 1.
   "@" Decrementa el valor numérico en 1.
   "*" Multiplica el valor numérico por sí mismo.
   "&" Imprime el valor numérico actual.
 */

const { data } = await axios.get("https://codember.dev/data/message_02.txt");

const compileProgram = (code) => {
  let output = "";
  let currentNum = 0;
  code.split("").forEach((ch) => {
    if (ch === "#") currentNum++;
    else if (ch === "@") currentNum--;
    else if (ch === "*") currentNum *= currentNum;
    else output += currentNum;
  });
  console.log("=== CODE ===");
  console.log(code);
  console.log("=== DECODED OUTPUT ===");
  console.log(output);
};

compileProgram(data);
