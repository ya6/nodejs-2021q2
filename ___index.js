import * as fs from "fs"
import { pipeline } from "stream/promises"
import chalk from "chalk"
import { promisify } from "util"

import handleData from "./handleData.js"
import encodeCaesar from "./encodeCaesar.js"

const rawArgs = process.argv
const args = handleData(rawArgs)
console.log(args)

if (!args.action || !args.shift) {
  process.exitCode = 1
  process.stderr.write(
    chalk.magentaBright.inverse(` Error `) +
      ` Has no ${args.action ? "" : "action"}${
        !args.action && !args.shift ? "," : ""
      } ${args.shift ? "" : "shift or shift=0"} argument`
  )
  process.exit()
}

const processFunc = (inputSteam, outputStream) => {
  inputSteam.on("data", (chunk) => {
    outputStream.write(chunk)
  })
}

let inputSteam = null
let outputStream = null

existPromise(args.inputFile)
  .then((exist) => {
    if (exist) {
      inputSteam = fs.createReadStream(args.inputFile)
    } else inputSteam = process.stdin
  })
  .then(() => existPromise(args.outputFile))
  .then((exist) => {
    console.log(
      "args.outputFile -->",
      args.outputFile,
      exist
    )
    if (exist) {
      outputStream = fs.createWriteStream(args.outputFile, {
        flag: "a",
      })
    } else outputStream = process.stdout
  })

  .then(() => console.log(ok))

// const run = async (inputSource, outputSource) => {
//   console.log('run')
//   await pipeline(
//     inputSource,
//     async function* (source) {
//       source.setEncoding("utf8")
//       for await (const chunk of source) {
//         yield encodeCaesar(chunk, args.shift)
//       }
//     },
//     outputSource
//   )
//   process.stdout.write(
//     chalk.greenBright.inverse(` Success `) +
//       ` data processed`
//   )
// }

// const existPromise = promisify(fs.exists)

// // existPromise(args.outputFile ).then(console.log).then(()=>existPromise(args.inputFile)).then(console.log)

// if (!args.outputFile) {outputStream = process.stdout}

// if (!args.inputFile) {inputSteam = process.stdin}

// const checkFiles =  async () => {

//   if (args.inputFile) {
//   fs.stat(args.inputFile, (error) => {
//       if (error) {
//         process.exitCode = 1
//         process.stderr.write(
//           chalk.magentaBright.inverse(` Error `) +
//           ` Can't find file ${args.inputFile}`
//           )
//           process.exit()
//         } else {inputSteam = fs.createWriteStream(args.outputFile)}
//   })
//   }

// }

// console.log("args.outputFile", args.outputFile);
// if (args.outputFile) {
//   fs.stat(args.outputFile, (error) => {
//     if (error) {
//       process.exitCode = 1
//       process.stderr.write(
//         chalk.magentaBright.inverse(` Error `) +
//         ` Can't find file ${args.outputFile}`
//         )
//         process.exit()
//       } else {outputStream = fs.createWriteStream(args.outputFile)}
//     })
//   } else {outputStream = process.stdout}

//   console.log(" args.inputFile", args.inputFile);
// if (args.inputFile) {
//   console.log(" -----------------args.inputFile--------------", args.inputFile);
//   fs.stat(args.inputFile, (error) => {
//     if (error) {
//       process.exitCode = 1
//       process.stderr.write(
//         chalk.magentaBright.inverse(` Error `) +
//         ` Can't find file ${args.inputFile}`
//         )
//         process.exit()
//       } else { console.log('else'); inputSteam = fs.createReadStream(args.inputFile)}
//     })
//   } else { console.log('else else')
//   inputSteam = process.stdout}

//   console.log("inp--------->",inputSteam,"out---------->", outputStream);

//       if (args.outputFile) {
//         fs.access(args.outputFile, function (error) {
//           if (error) {
//             process.exitCode = 1
//             process.stderr.write(
//               chalk.magentaBright.inverse(` Error `) +
//                 ` Can't find file ${args.outputFile}`
//             )
//             process.exit()
//           } else {
//             fs.appendFile(
//               args.outputFile,
//               encString,
//               (err) => {
//                 if (err) {
//                   process.exitCode = 1
//                   process.stderr.write(
//                     chalk.magentaBright.inverse(` Error `) +
//                       ` Can't write to file ${args.outputFile}`
//                   )
//                   process.exit()
//                 }
//                 process.stdout.write(
//                   chalk.greenBright.inverse(` Success `) +
//                     ` ${args.outputFile} saved`
//                 )
//               }
//             )
//           }
//         })
//       } else
//         process.stdout.write(
//           chalk.greenBright.inverse(` Encoded Output `) +
//             ` ${encString}`
//         )
//     })
//   }
// })

// console.log(rawArgs);
// process.on('exit', (code) => {
//   console.log(`About to exit with code: ${code}`);
// });

// const __filename = new URL('', import.meta.url).pathname;
// // Will contain trailing slash
// const __dirname = new URL('.', import.meta.url).pathname;
// console.log('sss', __dirname);

// https://abakbot.ru/online-5/301-rus-eng-alphabet
