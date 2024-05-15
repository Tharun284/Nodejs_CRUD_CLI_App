import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addManyData(info) {
  try {
    const entries = await inquirer.prompt([
      {
        type: "number",
        name: "count",
        message: "How many entries do you want to add?",
        validate: value => {
          if (!Number.isInteger(value) || value <= 0) {
            return "Please enter a valid positive integer.";
          }
          return true;
        }
      }
    ]);

    const newEntries = [];
    for (let i = 0; i < entries.count; i++) {
      const answer = await inquirer.prompt([
        { type: "input", name: "name", message: `Name for Entry ${i + 1}:` },
        { type: "number", name: "phone", message: `Phone for Entry ${i + 1}:` },
        {
          type: "list",
          name: "age",
          message: `Age for Entry ${i + 1}:`,
          choices: [
            { name: "Adult", value: "Adult" },
            { name: "Minor", value: "Minor" },
          ],
        },
      ]);

      const data = {
        id: uuidv4(),
        Name: answer.name,
        Phone: answer.phone,
        Age: answer.age,
      };
      newEntries.push(data);
    }

    const updatedInfo = [...info, ...newEntries];
    
    await fs.writeFile("db.json", JSON.stringify(updatedInfo), function (error) {
      if (error) {
        console.log("Error Writing To The Database");
      }
      console.log(`${entries.count} entries added successfully!`);
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

queryDB(addManyData);
