import fs from "fs"
import path from "path"
import { URL } from 'url';

import handleData from "./handleData.js"
const rawArgs = process.argv 
const args = handleData(rawArgs)
console.log(args);

if (!args.action || !args.shift) {
  process.exitCode = 1;
  process.stderr.write(`Has no ${args.action ? "" : "action"}${(!args.action && !args.shift) ? "," : ""} ${args.shift ? "" : "shift"} argument` )
  process.exit()
}


fs.readFile("./input.txt", 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});


// console.log(rawArgs);
// process.on('exit', (code) => {
  //   console.log(`About to exit with code: ${code}`);
  // });
  
  // const __filename = new URL('', import.meta.url).pathname;
  // // Will contain trailing slash
  // const __dirname = new URL('.', import.meta.url).pathname;
  // console.log('sss', __dirname);