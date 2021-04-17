<h1 style="font-family: Helvetica; font-size: 80px; margin-left: 50px;">
  mistyped
</h1>

A very lightweight package to get list of all possible words that might have been mistyped

[![NPM Version](https://img.shields.io/npm/v/mistyped?style=flat-square)](https://www.npmjs.com/package/mistyped)
[![NPM Downloads](https://img.shields.io/npm/dm/mistyped?style=flat-square&logo=npm)](https://npmcharts.com/compare/mistyped?minimal=true)
[![PayPal](https://img.shields.io/badge/-Donate-blue?logo=paypal)](https://paypal.me/abkhare9/5usd)

## Installation
Using npm:
```shell
$ npm i mistyped
```

## Usage
Suppose a user wants to type `tea` but instead typed `tes`. Using this library you can get all possible word combination of `tes`.

```js
const mistyped = require("mistyped")
const possibleWords = mistyped("tes")

console.log(possibleWords)
// [
//   'tws',
//   'trs',
//   'tss',
//   'tds',
//   'tea',
//   'ted',
//   'tew',
//   'tee',
//   'tez'
// ]
```
You can see `tea` also appeared in the list.

This library is NOT based on Levenshtein distance. Instead, it tries to guess the list of most likely words of a mistyped word.

One way to use this library is to merge it with your search engine or pre existing dictionary for better search results.

Note: It only works for QWERTY keyboard and alphabets only.

Another example:
```js
const mistyped = require("mistyped")
const possibleWords = mistyped("ahve", {startAfter: 0})

console.log(possibleWords)
// [
//   'shve', 'qhve',
//   'whve', 'agve',
//   'ajve', 'ayve',
//   'auve', 'abve',
//   'ahce', 'ahbe',
//   'ahge', 'ahvw',
//   'ahvr', 'ahvs',
//   'ahvd', 'have',
//   'ahev'
// ]
```
You can see `have` appeared here. We will see later what `startAfter` means.

## API Reference

#### `const mistyped = require("mistyped")`

---

#### `mistyped(word, [options])`

| Argument | Type       | Required | Description             |
|----------|------------|----------|-------------------------|
| word     | `string`   | `true`   | Input word to analyze for mistyping |
| options  | `object`   | `false`  | Options _(see below)_   |


`options` object properties:

| Property | Type      | Default | Description                                                   |
|----------|-----------|---------|---------------------------------------------------------------|
| startAfter | `integer`  | `1`  | Leave number of characters from the beginning. Like for word "coffee", if `startAfter` is 2 then it will leave "co" and will only take "ffee" for further analysis                        |
| dimension   | `integer`  | `2`    | Allowed only 3 values 0, 1 and 2. Increasing value means lot more possible words. Play around with this option to know more |
| includeMisplaced   | `boolean`  | `true`    | Include characters misplaced possibilities. Like "have" may have been typed "ahve". "h" and "a" have been misplaced. |

---

## Usage with `options`
Use default options for the best results but if you want to explore further, you can play around with it and get results according to your application.

#### Example: Get only misplaced words
We can just get only misplaced words possibilities by keeping `dimension = 0`
```js
const mistyped = require("mistyped")
const options = {
  startAfter: 0,
  dimension: 0,
}
const possibleWords = mistyped("ahve", options)

console.log(possibleWords)
// [ 'have', 'ahev' ]
```
In previous example similar to this, the list was bigger. You can see `have` appeared here.

similarly you can exclude misplaced words possibilities by keeping `includeMisplaced = false`

#### Example: With different `startAfter`
As mentioned before `startAfter` starts the analysis after that position and by default its value is chosen to be `1` using this assumption that a user will not make any mistake with the first word while typing. But what if, you want to start the analysis after position `2` and for misplaced words possibilities, you realised it is best to start from the beginning like we did in `ahve` example. You can achieve this like
```js
const mistyped = require("mistyped")
const word = "ahve"
const optionsExcludeMisplaced = {
  startAfter: 2,
  dimension: 2,
  includeMisplaced: false
}
const optionsMisplacedOnly = {
  startAfter: 0,
  dimension: 0,
  includeMisplaced: true
}
const excludeMisplacedList = mistyped(word, optionsExcludeMisplaced)
const misplacedOnlyList = mistyped(word, optionsMisplacedOnly)

const possibleWords = [...excludeMisplacedList, ...misplacedOnlyList]

console.log(possibleWords)
// [
//   'ahce', 'ahbe',
//   'ahge', 'ahvw',
//   'ahvr', 'ahvs',
//   'ahvd', 'have',
//   'ahev'
// ]
```

#### Use it with your search engine
This library is not dependent on any dictionary so it can be used with any word like for example, you have a search engine where you can find a user by its name. While searching for `John`, suppose it has been mistyped to `Johm`
```js
const mistyped = require("mistyped")
const possibleWords = mistyped("Johm")

console.log(possibleWords)
// [
//   'jihm', 'jphm',
//   'jkhm', 'jlhm',
//   'jogm', 'jojm',
//   'joym', 'joum',
//   'jobm', 'john',
//   'johk'
// ]
```
Now search with all these words. `John` will appear in the search result

## Origin Story
Levenshtein distance works amazing but searching is not good because it involves all possibilities which may not be required. Like for example `ten` and `tea` has Levenshtein distance `1` but there is very very less chance that `tea` has been mistyped as `ten`. This package handles that very well.

## License
[MIT](LICENSE)

## Author
[Abhishek Khare](https://github.com/wallgeek)
