import axios from "axios";

async function getData() {
  const response = await axios.get("https://codember.dev/colors.txt");
  return response.data;
}

async function answer() {
  const results = { zebraLights: [], length: 0, lastLight: "" };
  const lights = await getData();
  //const lights = ["red", "blue", "red", "blue", "green"]; // await getData();
  //const lights = ["green", "red", "blue", "gray"];
  //const lights = ["blue", "blue", "blue", "blue"];
  //const lights = ["red", "green", "red", "green", "red", "green"];
  //const lights = ["blue", "red", "blue", "red", "gray"];
  //const lights = ["red", "red", "blue", "red", "red", "red", "green"];
  //const lights = ["red", "blue", "red", "green", "red", "green", "red", "green"];
  //const lights = ["green", "red", "green", "blue", "red", "blue"];

  for (let idx = 0; idx < lights.length - 1; idx++) {
    const color1 = lights[idx];
    const color2 = lights[idx + 1];

    if (color1 === color2) {
      // update results
      const zebraLights = lights.slice(idx, idx + 1);
      if (zebraLights.length >= results.length) {
        results.zebraLights = zebraLights;
        results.length = zebraLights.length;
        results.lastLight = zebraLights[zebraLights.length - 1];
      }
      continue;
    }

    if (idx + 2 > lights.length - 1) {
      // the next color does not exist
      const zebraLights = lights.slice(idx, idx + 2);
      if (zebraLights.length >= results.length) {
        // update the max zebra lights count
        results.zebraLights = zebraLights;
        results.length = zebraLights.length;
        results.lastLight = zebraLights[zebraLights.length - 1];
      }
    }

    const isFirstColorEven = (idx + 2) % 2 === 0;
    const colorTypes = {
      even: isFirstColorEven ? color1 : color2,
      odd: isFirstColorEven ? color2 : color1
    };

    for (let j = idx + 2; j < lights.length; j++) {
      const currentColorType = j % 2 === 0 ? "even" : "odd";
      const currentColor = lights[j];
      if (currentColor !== colorTypes[currentColorType]) {
        // the colors are different
        const zebraLights = lights.slice(idx, j);
        if (zebraLights.length >= results.length) {
          // update the max zebra lights count
          results.zebraLights = zebraLights;
          results.length = zebraLights.length;
          results.lastLight = zebraLights[zebraLights.length - 1];
        }
        break;
      }
      if (j === lights.length - 1) {
        // last light
        const zebraLights = lights.slice(idx, j + 1);
        if (zebraLights.length >= results.length) {
          // update the max zebra lights count
          results.zebraLights = zebraLights;
          results.length = zebraLights.length;
          results.lastLight = zebraLights[zebraLights.length - 1];
        }
      }
    }
  }

  console.log("=== RESULTS ===");
  console.log({ results });
}

answer();
