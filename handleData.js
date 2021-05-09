const handleData = (args)=> {
    return {
    actionFlag:  args.includes("--action") || args.includes("-a"),
    action:  (args.includes("encode") &&  "encode" ||  args.includes("decode") &&  "decode"),
    shiftFlag:  args.includes("--shift") || args.includes("-s"),
    shift: (+args.filter((arg) => (!isNaN(arg)))[0]) % 26 || false, // )
    inputFlag:  args.includes("--input") || args.includes("-i"),
    inputFile: args.includes("--input") && args[args.indexOf("--input")+1] || args.includes("-i")  && args[args.indexOf("-i")+1] || false,
    outputFlag:  args.includes("--output") || args.includes("-o"),
    outputFile: args.includes("--output") && args[args.indexOf("--output")+1] || args.includes("-o")  && args[args.indexOf("-o")+1] || false,    
}
}
export default handleData