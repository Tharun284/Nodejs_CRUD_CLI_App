import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
  dbFileCheck();

  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "id", message: "Please Enter Record ID" },
    ]);

    let user;
    info.forEach((element) => {
      if (element.id === answer.id) {
        user = element;

        updateDetails(user, info);
      }
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

async function updateDetails(user, info) {
  try {
    const feedback = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        default: user.Name,
        message: "Please Enter Your Name:",
      },
      {
        type: "number",
        name: "phone",
        default: user.Phone,
        message: "Please Enter Your Number:",
      },
      {
        type: "list",
        name: "age",
        default: user.Age,
        message: "Are You An Adult?:",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);

    user.Name = feedback.name;
    user.Phone = feedback.phone;
    user.Age = feedback.age;

    await fs.writeFile("db.json", JSON.stringify(info), function (error) {
      if (error) {
        console.log("Error Updating Database");
      }
      console.log("User Updated Successfully!");
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

queryDB(updateData);
