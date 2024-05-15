import fs from "fs";
import { exit } from "process";

// // if(fs.existsSync("addData.js")){
// if(!fs.existsSync("db.json")){
//     console.log("File Does Not Exist");
// }

export default async function dbFileCheck() {
    if(!fs.existsSync("db.json")){
        console.log("File Does Not Exist");
        exit(1);
    }
}