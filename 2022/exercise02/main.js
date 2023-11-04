//const MESSAGE =
"11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101";

const MESSAGE =
  "83101 113117105101110 101114101115 84101 9911111011112299111 84117 110111 109101 9911111011199101115 97 109105 84101 101115116111121 1119811510111411897110100111 84101 101115116111121 115105103117105101110100111 81117105101114101115 10611710397114 7411710110397 99111110109105103111 8697108101 8697109111115 97 10611710397114 691061019911711697 101115116101 9911110997110100111 101110 10897 11610111410910511097108 11511798109105116 116561181061045651505752561029911097108";

function decryptMessage() {
  let decryptedMessage = "";
  try {
    // get words
    const words = MESSAGE.split(/\s/);

    words.forEach((word, idx) => {
      const normalizedWord = normalizeWord(word);
      //console.log({ normalizedWord });
      if (normalizedWord.length % 3 !== 0) throw new Error("The message is in an incorrect format!");

      for (let idx = 0; idx < normalizedWord.length; idx += 3) {
        const letter = normalizedWord.substring(idx, idx + 3);
        //decryptedMessage += HTML_DECODER[parseInt(letter)];
        decryptedMessage += String.fromCharCode(parseInt(letter));
      }

      // add withspace
      if (words.length - 1 !== idx) decryptedMessage += " ";
    });
  } catch (error) {
    console.error(error);
  }

  return decryptedMessage;
}

function normalizeWord(word) {
  let normalizedWord = "";

  for (let i = 0, j = 2; i < word.length; i += j) {
    // get 2 numbers first
    let chunk = word.substring(i, i + 2);
    if (parseInt(chunk) < 32) {
      // take 3 numbers
      chunk = word.substring(i, i + 3);
      j = 3;
    } else {
      j = 2;
      chunk = "0" + chunk;
    }

    normalizedWord += chunk;
  }
  return normalizedWord;
}

const decryptedMessage = decryptMessage();
console.log("MESSAGE => ", MESSAGE);
console.log("DECRYPTED MESSAGE => ", decryptedMessage);
