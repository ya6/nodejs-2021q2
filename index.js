import * as fs from "fs"
import  { pipeline }  from "stream/promises"
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
      } ${args.shift ? "" : "shift or shift = 0"} argument`
  )
  process.exit()
}


async function run() {
  await pipeline(
 
    true ? process.stdin : fs.createReadStream(args.inputFile),
   
     async function* (source) {
      source.setEncoding('utf8');  
      for await (const chunk of source) {
        yield encodeCaesar(chunk, args.shift);
      }
    },
    // async function (source) {
    //   console.log('-->',source);
    // }
   
  fs.createWriteStream(args.outputFile)
  );
  console.log('Pipeline succeeded.');
}
 run().catch(console.error);


// async function run() {
//   await pipeline(
//     fs.createReadStream('input.txt'),
//     fs.createWriteStream('out.txt')
//   );
//   console.log('Pipeline succeeded.');
// }

// run().catch(console.error);


// //check for args
// if (!args.action || !args.shift) {
//   process.exitCode = 1
//   process.stderr.write(
//     chalk.magentaBright.inverse(` Error `) +
//       ` Has no ${args.action ? "" : "action"}${
//         !args.action && !args.shift ? "," : ""
//       } ${args.shift ? "" : "shift"} argument`
//   )
//   process.exit()
// }

// //funcs

// //-----

// fs.access(args.inputFile, function (error) {
//   if (error) {
//     // todo stdin functional
//     process.stdout.write(
//       chalk.greenBright.inverse(`Enter the data: `)
//     )

//     process.stdin.setEncoding('utf8');

//     process.stdin.on('readable', () => {
//       var chunk = process.stdin.read();
//       if (chunk !== null) {
//         process.stdout.write(`data: ${chunk}`);
//       }
//     });
  
    // process.stdin.on('end', () => {
    //   process.stdout.write('end');
    // });


   
//   } else {
//     fs.readFile(args.inputFile, "utf8", (err, data) => {
//       if (err) {
//         process.exitCode = 1
//         process.stderr.write(
//           chalk.magentaBright.inverse(` Error `) +
//             ` Can't read source from ${args.inputFile}`
//         )
//         process.exit()
//       }
//       const encString = encodeCaesar(data, args.shift)

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
