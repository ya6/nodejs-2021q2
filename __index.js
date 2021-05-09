import * as fs from "fs"
import { pipeline } from "stream/promises"
import chalk from "chalk"

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

// const run = async (inputSource, outputSource) => {
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

const run = async (inputSource, outputSource) => {
  console.log("run");
  //  console.log('in', inputSource);
  //  console.log('out', outputSource);
  process.stdin
  process.stdout
}

fs.access(args.inputFile, function (error) {
  if (error) {
    console.log("I -NO")
    process.stdout.write(
      chalk.greenBright.inverse(`Enter the data: `)
    )
    fs.access(args.outputFile, function (error) {
      if (error) {
        console.log("I -no O -no")
        run(
          () => process.stdin,
          () => process.stdout
        )
      } else {
        run(
          () => process.stdin,
          () => fs.createWriteStream(args.outputFile)
        )
      }
    })
  } else {
    console.log("I -yes")
    fs.access(args.outputFile, function (error) {
      if (error) {
        console.log("I -yes O -no" )
        process.stdout.write(
          chalk.greenBright.inverse(`Output data: `)
        )
        run(
          () => fs.createReadStream(args.inputFile),
          () => process.stdout
          )
        } else {
        console.log("I -yes O -yes")
        run(
          () => fs.createReadStream(args.inputFile),
          () => fs.createWriteStream(args.outputFile)
        )
      }
    })
  }
})

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
