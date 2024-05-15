import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeManyData(info) {
  dbFileCheck();

  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "ids",
        message: "Please Enter Record IDs to Remove (comma-separated):",
      },
    ]);

    const idsToRemove = answer.ids.split(",").map((id) => id.trim()); // Splitting and trimming IDs

    const remainingRecords = info.filter(
      (element) => !idsToRemove.includes(element.id)
    ); // Filtering out the records to remove

    await fs.writeFile(
      "db.json",
      JSON.stringify(remainingRecords),
      function (error) {
        if (error) {
          console.log("Error while updating database");
        }

        console.log("Records removed successfully!");
      }
    );
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

queryDB(removeManyData);
