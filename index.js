const QWERTY = [
     "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
  null, "a", "s", "d", "f", "g", "h", "j", "k", "l",
      null,  "z", "x", "c", "v", "b", "n", "m"
]

const Options = {
  dimension: 2, // 2
  startAfter: 1,
  includeMisplaced: true
}

const trimWord = word => word.split(" ")[0]
const splitWord = word => word.split("")
const lowerCase = word => word.toLowerCase()

const getSurrounding = (char, dimension) => {
  let {li, ri} = get1D(char)
  let {tli = -1, tri = -1, bli = -1, bri = -1} = dimension === 2 ? get2D(char) : {}

  let indexList = [li, ri, tli, tri, bli, bri]

  return indexList.map(ele => QWERTY[ele]).filter(ele => ele)

}

const getMisplacedList = (word, options) => {
  let charList = splitWord(word)

  let midIndexList = ["y", "g", "v"].map(ele => QWERTY.indexOf(ele))

  let len = charList.length
  let list = []
  const {startAfter} = options

  for (var i = startAfter; i < len - 1; i++) {
    let left = charList[i]
    let right = charList[i + 1]
    let li = QWERTY.indexOf(left)
    let ri = QWERTY.indexOf(right)
    let getHalf = ind => ind < midIndexList[0]
    || (ind > 9 && ind < midIndexList[1])
    || (ind > 19 && ind < midIndexList[2])

    let lh = getHalf(li) ? -1 : 1
    let rh = getHalf(ri) ? -1 : 1

    if(lh + rh === 0) {
      let charInterList = [...charList]
      let ith = charInterList[i]
      charInterList[i] = charInterList[i + 1]
      charInterList[i + 1] = ith

      list.push(charInterList.join(""))
    }
  }

  return list

}

const get2D = char => {
  let charIndex = QWERTY.indexOf(char)
  let tli = tri = bli = bri = -1

  if(charIndex >= 0 && charIndex <= 9) {
    bli = charIndex + 10
    bri = charIndex + 10 + 1
  }else if (charIndex >= 10 && charIndex <= 19) {
    tli = charIndex - 11
    tri = charIndex - 11 + 1

    bli = charIndex + 9
  }else if (charIndex >= 20) {
    tli = charIndex - 9
  }

  return {bli, bri, tli, tri}
}

const get1D = char => {
  let charIndex = QWERTY.indexOf(char)
  let li = charIndex - 1
  let ri = charIndex + 1

  return {li, ri}
}

const getDimensionList = (text, options) => {
  let word = trimWord(text)
  word = lowerCase(word)
  charList = splitWord(word)

  const len = charList.length
  const {startAfter, dimension} = options
  const list = []

  for (var i = startAfter; i < len; i++) {
    let char = charList[i]
    let errorCharList = getSurrounding(char, dimension)

    errorCharList.forEach(ele => {

      list.push(charList.map((e, index) => index === i ? ele : e))
    })
  }

  return list.map(ele => ele.join(""))
}

module.exports = (text, options) => {
  let opts = {...Options, ...options}
  let word = text

  let dimensionList = opts.dimension ? getDimensionList(word, opts) : []
  let includeMisplacedList = opts.includeMisplaced ? getMisplacedList(word, opts) : []

  return Object.keys(                         // return unique
    [...dimensionList, ...includeMisplacedList]
    .reduce((acc, ele) => ({...acc, [ele]: ele}), {})
  )
}
