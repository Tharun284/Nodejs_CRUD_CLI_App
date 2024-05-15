import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeData(info) {
  dbFileCheck();

  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "id", message: "Please Enter Record ID" },
    ]);

    let remnantData = [];
    info.forEach((element) => {
      if (element.id !== answer.id) {
        remnantData.push(element);
      }
    });
    await fs.writeFile(
      "db.json",
      JSON.stringify(remnantData),
      function (error) {
        if (error) {
          console.log("Error while updating database");
        }

        console.log("record deleted successfully!");
      }
    );
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

queryDB(removeData);
