import * as fs from "fs"
import { pipeline } from "stream/promises"
import chalk from "chalk"
import { promisify } from "util"

import handleData from "./handleData.js"
import encodeCaesar from "./encodeCaesar.js"
import decodeCaesar from "./decodeCaesar.js"

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


const run = async (inputSource, outputSource, caesar) => {
  await pipeline(
    inputSource,
    async function* (source) {
      source.setEncoding("utf8")
      for await (const chunk of source) {
        yield caesar(chunk, args.shift)
      }
    },
    outputSource
  )
  process.stdout.write(
    chalk.greenBright.inverse(` Success `) +
      ` data processed`
  )
}

const caesarFunc = args.action.toLowerCase() === "encode" ? encodeCaesar : decodeCaesar

let inputSteam = null
let outputStream = null


const existPromise = promisify(fs.exists)

existPromise(args.inputFile)
  .then((exist) => {
    if (exist) {
      inputSteam = fs.createReadStream(args.inputFile)
    } else inputSteam = process.stdin
  })
  .then(() => existPromise(args.outputFile))
  .then((exist) => {
    if (exist) {
      outputStream = fs.createWriteStream(args.outputFile, {
        flag: "a",      
      })
    } else outputStream = process.stdout
  })
  .then(() => run(inputSteam, outputStream ,caesarFunc))