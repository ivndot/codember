import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({ input: createReadStream("./users.txt") });

const realUsers = [];
let user = {};

lineReader.on("line", line => {
  if (line === "") {
    // only register the user if he has
    // at least 6 properties
    if (Object.keys(user).length >= 6) {
      realUsers.push(user);
    }
    // clean the object and return
    user = {};
    return;
  }
  // get user data
  const userData = line.split(/\s/);
  // build the user object
  userData.forEach(data => {
    const [attr, info] = data.split(":");
    user[attr] = info;
  });
});

lineReader.on("close", () => {
  console.log("TOTAL VALID USERS => ", realUsers.length);
  console.log("LAST VALID USER => ", realUsers.pop());
  console.log({ realUsers });
});
