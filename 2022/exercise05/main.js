import axios from "axios";

async function answer() {
  //const mecenas = ["juan", "diego", "maradona", "ronaldo", "pablo", "messi", "jdjd", "33", "sdl", "ad"];
  const mecenas = await getData();
  const indexes = mecenas.map((_, idx) => idx);

  while (indexes.length > 1) {
    console.log("=== ITERATION ===");
    console.log({ indexes });
    const indexesToRemove = getIndexesToRemove(indexes);
    removeIndexes(indexesToRemove, indexes);
  }

  const winnerIndex = indexes[0];

  console.log("=== WINNER ===");
  console.log({ totalPlayers: mecenas.length, winnerIndex, winner: mecenas[winnerIndex] });
}

/**
 * Function to remove the odd indexes in the array
 * @param {Array<Number>} indexesToRemove An array of indexes to be removed
 * @param {Array<Number} indexes An array of indexes
 */
function removeIndexes(indexesToRemove, indexes) {
  console.log({ indexesToRemove });
  let counter = 0;
  indexesToRemove.forEach(indexToRemove => {
    // drop the odd index of the array
    indexes.splice(indexToRemove - counter++, 1);
  });
}

/**
 * Function to get the indexes to be removed in an array
 * @param {Array<Number>} indexes An array of indexes
 * @returns An array of indexes to be removed
 */
function getIndexesToRemove(indexes) {
  const indexesToRemove = [];
  for (let idx = 0; idx < indexes.length; idx++) {
    if (idx % 2 === 0) continue;
    indexesToRemove.push(idx);
  }
  // add index 0 if the length is odd
  if (indexes.length % 2 !== 0) {
    indexesToRemove.unshift(0);
  }

  return indexesToRemove;
}

/**
 * Function to get the data from codember
 * @returns An array of mecenas
 */
async function getData() {
  const response = await axios.get("https://codember.dev/mecenas.json");
  return response.data;
}

answer();
