import axios from "axios";

async function getData() {
  const response = await axios.get("https://codember.dev/colors.txt");
  return response.data;
}

async function answer() {
  //const lights = ["red", "blue", "red", "blue", "green"]; // await getData();
  const lights = ["green", "red", "blue", "gray"];
  //const lights = ["blue", "blue", "blue", "blue"];
  //const lights = ['red', 'green', 'red', 'green', 'red', 'green'];
  //const lights = ["blue", "red", "blue", "red", "gray"];
  //const lights = ["red", "red", "blue", "red", "red", "red", "green"];
  //const lights = ["red", "blue", "red", "green", "red", "green", "red", "green"];
  //const lights = ["green", "red", "green", "blue", "red", "blue"];
  let zebraCounter = 0;
  let lastZebraLight = "";
  const results = {
    maxZebraCounter: 0,
    lastZebraLight: null
  };

  if (lights.length < 2) return;

  let [first, second] = lights;
  let lightToCompare = first;
  let isFirstEqualsToSecond = false;
  lights.forEach((light, idx) => {
    if (first === second && idx > 1) {
      isFirstEqualsToSecond = true;
      zebraCounter = 1;
      lastZebraLight = light;
      first = lights[idx - 1];
      second = light;
      return;
    } else {
      isFirstEqualsToSecond = false;
    }

    const isSameLight = light === lightToCompare;

    if (isSameLight) {
      zebraCounter++;
      lastZebraLight = light;
    } else {
      // get the max zebra counting
      zebraCounter = isFirstEqualsToSecond ? zebraCounter + 1 : zebraCounter;
      if (zebraCounter >= results.maxZebraCounter) {
        results.maxZebraCounter = zebraCounter;
        results.lastZebraLight = lastZebraLight;
      }

      // diff color appears
      first = lights[idx - 1];
      second = light;
      // restart zebra counter and last light
      zebraCounter = 1;
      lastZebraLight = light;

      lightToCompare = first;
      return;
    }

    // change ligths
    if (lightToCompare === first) {
      lightToCompare = second;
    } else {
      lightToCompare = first;
    }
  });

  // last validation
  if (zebraCounter >= results.maxZebraCounter) {
    results.maxZebraCounter = zebraCounter;
    results.lastZebraLight = lastZebraLight;
  }

  console.log("=== RESULTS ===");
  console.log(results);
}

answer();
