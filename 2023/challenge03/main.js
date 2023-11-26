import axios from "axios";

const { data } = await axios.get(
  "https://codember.dev/data/encryption_policies.txt"
);

/**
 * Show the invalid passwords based on the specified rules
 * @param {string} data The list of passwords with it's rules
 */
const getInvalidPasswords = (data) => {
  /**
     2-4 f: fgff
     4-6 z: zzzsg
     1-6 h: hhhhhh
  */
  const lines = data.split("\n");
  const invalidPasswords = lines.filter((line) => {
    const [rule, password] = line.split(":");
    const { min, max, ch } = getLimits(rule);
    const map = createMap(password.trim());
    const characterRepetitions = !map.get(ch) ? 0 : map.get(ch);
    // get only the invalid passwords
    return characterRepetitions < min || characterRepetitions > max;
  });

  console.log("=== INVALID PASSWORDS ===");
  invalidPasswords.forEach((passwd, idx) =>
    console.log(`${idx + 1}.- ${passwd}`)
  );
};

/**
 * Generate a hashmap from a string where the keys are each character and the value,
 * the times it appers in the string
 * @param {string} password The password to be evaluated
 * @returns A HashMap object
 */
const createMap = (password) => {
  const map = new Map();
  password
    .split("")
    .forEach((ch) =>
      map.has(ch) ? map.set(ch, map.get(ch) + 1) : map.set(ch, 1)
    );
  return map;
};

/**
 * Get the min and max repetitions of the specified character
 * @param {string} rule The rule in the format `min-max ch`
 * @returns An object containing `min, max and character`
 */
const getLimits = (rule) => {
  const [limits, ch] = rule.split(/\s/);
  const [min, max] = limits.split("-");
  return { min: parseInt(min), max: parseInt(max), ch };
};


getInvalidPasswords(data);
