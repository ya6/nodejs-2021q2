import * as fs from "fs"
import path from "path"
import { URL } from "url"
import chalk from "chalk"

import handleData from "./handleData.js"


const rawArgs = process.argv
const args = handleData(rawArgs)
console.log(args)


//check for args
if (!args.action || !args.shift) {
  process.exitCode = 1
  process.stderr.write(chalk.magentaBright.inverse(` Error `)+
    ` Has no ${args.action ? "" : "action"}${
      !args.action && !args.shift ? "," : ""
    } ${args.shift ? "" : "shift"} argument`
  )
  process.exit()
}

//funcs
const encodeCaesar = (data = "", shift) => {
  const inputArray = data.split("")
  const encodedArray = inputArray.map((el) => {
    if (el.charCodeAt(0) >= 97 && el.charCodeAt(0) <= 122) {
      return String.fromCharCode(
        (((el.charCodeAt(0) + shift) % 123) % 97) + 97
      )
    } else if (
      el.charCodeAt(0) >= 65 &&
      el.charCodeAt(0) <= 90
    ) {
      return String.fromCharCode(
        (((el.charCodeAt(0) + shift) % 91) % 65) + 65
      )
    } else return el
  })

  // console.log("encodeCaesar", encodedArray.join(""), shift)
  return encodedArray.join("")
}

//-----

fs.readFile(args.inputFile, "utf8", (err, data) => {
  if (err) {
    process.exitCode = 1
    process.stderr.write(chalk.magentaBright.inverse(` Error `)+` Can't read source file ${args.inputFile}`)
    process.exit()
  }
  const encString = encodeCaesar(data, args.shift)

  if (args.outputFile) {

    fs.access(args.outputFile, function(error){
      if (error) {
        process.exitCode = 1
        process.stderr.write(chalk.magentaBright.inverse(` Error `)+` Can't find file ${args.outputFile}`)
        process.exit()
      } else {
        fs.appendFile(args.outputFile, encString, (err) => {
          if (err){
            process.exitCode = 1
            process.stderr.write(chalk.magentaBright.inverse(` Error `)+` Can't write to file ${args.outputFile}`)
            process.exit()
          }
          process.stdout.write(chalk.greenBright.inverse(` Success `)+` ${args.outputFile} saved`)
        });
      }
  });

    
  } else   process.stdout.write(chalk.greenBright.inverse(` Encoded Output `)+` ${encString}`)
  
  

})

// console.log(rawArgs);
// process.on('exit', (code) => {
//   console.log(`About to exit with code: ${code}`);
// });

// const __filename = new URL('', import.meta.url).pathname;
// // Will contain trailing slash
// const __dirname = new URL('.', import.meta.url).pathname;
// console.log('sss', __dirname);

// https://abakbot.ru/online-5/301-rus-eng-alphabet
