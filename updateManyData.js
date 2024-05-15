import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateManyData(info) {
  dbFileCheck();

  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "ids",
        message: "Please Enter Record IDs to Update (comma-separated):",
      },
    ]);

    const idsToUpdate = answer.ids.split(",").map((id) => id.trim()); // Splitting and trimming IDs

    const recordsToUpdate = info.filter((element) =>
      idsToUpdate.includes(element.id)
    ); // Filtering out the records to update

    const updatedRecords = [];
    for (const record of recordsToUpdate) {
      try {
        const feedback = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            default: record.Name,
            message: "Please Enter New Name for ID " + record.id + ":",
          },
          {
            type: "number",
            name: "phone",
            default: record.Phone,
            message: "Please Enter New Phone Number for ID " + record.id + ":",
          },
          {
            type: "list",
            name: "age",
            default: record.Age,
            message: "Are You An Adult for ID " + record.id + "?:",
            choices: [
              { name: "Y", value: "Adult" },
              { name: "N", value: "Minor" },
            ],
          },
        ]);

        record.Name = feedback.name;
        record.Phone = feedback.phone;
        record.Age = feedback.age;

        updatedRecords.push(record);
      } catch (error) {
        console.log(
          "Something went wrong with record ID " + record.id + "!",
          error
        );
      }
    }

    const updatedInfo = info.map((record) => {
      const updatedRecord = updatedRecords.find(
        (updated) => updated.id === record.id
      );
      return updatedRecord ? updatedRecord : record;
    });

    await fs.writeFile(
      "db.json",
      JSON.stringify(updatedInfo),
      function (error) {
        if (error) {
          console.log("Error updating database");
        }
        console.log("Records updated successfully!");
      }
    );
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

queryDB(updateManyData);
