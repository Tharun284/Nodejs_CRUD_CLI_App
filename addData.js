import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "name", message: "Please Enter Your Name:" },
      { type: "number", name: "phone", message: "Please Enter Your Number:" },
      {
        type: "list",
        name: "age",
        message: "Are You An Adult?:",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);

    const data = {
      id: uuidv4(),
      Name: answer.name,
      Phone: answer.phone,
      Age: answer.age,
    };
    info.push(data);

    if (fs.existsSync("db.json")) {
      addDetails(info);
    } else {
      fs.appendFile("db.json", "[]", function (error) {
        if (error) {
          console.log("Creating file unsuccessful");
        }
        console.log("db.json file created successfully");
        addDetails(info);
      });
    }
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

async function addDetails(info) {
  await fs.writeFile("db.json", JSON.stringify(info), function (error) {
    if (error) {
      console.log("Error Writing To The Database");
    }
    console.log("Data Added Successfully");
  });
}

queryDB(addData);
