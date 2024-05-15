import fs from "fs";
// import { exit } from "process";

export default async function queryDB(externalFunction) {
  //   fs.readFile("dbFileCheck.js", function (error, data) {
  //     if (error) {
  //       console.log("Something went wrong", error);
  //       exit(1);
  //     }

  //     console.log(data.toString());
  //   });
  try {
    let info = [];

    if (fs.existsSync("db.json")) {
      // if (fs.existsSync("dbFileCheck.js")) {
      await fs.readFile("db.json", function (error, data) {
        // await fs.readFile("dbFileCheck.js", function (error, data) {
        if (error) {
          console.log("Reading File Failed", error);
          return;
        }

        // console.log(data.toString());

        info = JSON.parse(data.toString());
        console.log(info);

        if (externalFunction && !error) {
          externalFunction(info);
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction(info);
        return;
      }
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

// queryDB()
