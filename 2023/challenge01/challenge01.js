import axios from "axios";

async function getData() {
  const data = await axios.get("https://codember.dev/data/message_01.txt");
  return data.data;
}

const data = await getData();
const clearData = data.trim().toLowerCase();
const map = new Map();

clearData.split(/\s+/).forEach((item) => {
  if (map.has(item)) map.set(item, map.get(item) + 1);
  else map.set(item, 1);
});

let patterns = "";
for (const [key, value] of map.entries()) {
  patterns += `${key}${value}`;
}

console.log("============PATTERNS============");
console.log(patterns);

/**
 * submit murcielago15leon15jirafa15cebra6elefante15rinoceronte15hipopotamo15ardilla15mapache15zorro15lobo15oso15puma2jaguar14tigre10leopardo10gato12perro12caballo14vaca14toro14cerdo14oveja14cabra14gallina10pato10ganso10pavo10paloma10halcon11aguila11buho11colibri9canario8loro8tucan8pinguino7flamenco7
 */
