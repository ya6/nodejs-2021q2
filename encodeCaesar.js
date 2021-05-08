const encodeCaesar =  (data = "", shift) => {
    const inputArray =   data.split("")
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
  export default encodeCaesar