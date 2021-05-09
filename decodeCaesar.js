const decodeCaesar = (data = "", shift) => {
  const inputArray = data.split("")
  const encodedArray = inputArray.map((el) => {
    if (el.charCodeAt(0) >= 97 && el.charCodeAt(0) <= 122) {
      const _elCode =
        el.charCodeAt(0) - shift < 97
          ? 123 - (97 - (el.charCodeAt(0) - shift))
          : el.charCodeAt(0) - shift

      return String.fromCharCode(_elCode)
    } else if (
      el.charCodeAt(0) >= 65 &&
      el.charCodeAt(0) <= 90
    ) {
      const _elCode =
        el.charCodeAt(0) - shift < 65
          ? 91 - (65 - (el.charCodeAt(0) - shift))
          : el.charCodeAt(0) - shift
      return String.fromCharCode(_elCode)
    } else return el
  })
  return encodedArray.join("")
}
export default decodeCaesar
