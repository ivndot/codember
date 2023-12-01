import axios from "axios";

const { data } = await axios.get(
  "https://codember.dev/data/files_quarantine.txt"
);

/**
 * Create a hashmap from a text
 * @param {string} text A text to convert it to a hashmap
 * @returns A hashmap
 */
const createHashMap = (text) => {
  const map = new Map();
  text.split("").forEach((ch) => {
    map.set(ch, map.has(ch) ? map.get(ch) + 1 : 1);
  });
  return map;
};

/**
 * Create a checksum from a hashmap from characters that are unique and in the order of aparition
 * @param {Map} map A hashmap
 * @returns An string representing the checksum
 */
const createCheckSum = (map) => {
  return [...map.keys()]
    .filter((ch) => map.get(ch) === 1)
    .reduce((checksum, ch) => (checksum += ch), "");
};

const realFiles = data.split("\n").filter((line) => {
  const [first, realChecksum] = line.split("-");
  const map = createHashMap(first);
  const checksum = createCheckSum(map);

  return checksum === realChecksum;
});

console.log("=== REAL FILES ===");
realFiles.forEach((fileName, idx) => console.log(`${idx + 1}.- ${fileName}`));
