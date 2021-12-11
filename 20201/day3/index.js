import "./styles.css";
import raw from "./input.txt";

const input = raw.split("\n").map((x) => x.trim().split(""));
// console.log(input);
// [ [001000010101], [001000010101] ...]

/*
// 1ts -> x, y++ 
[0]0100  [0][0]
[1]1110  [1][0]
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
 */

let gammaRate = []; // most common bit in a position
let epsilonRate = []; // least common bit in a position

// results = gammaRate * epsilonRate

// loop
for (let y = 0; y < input[0].length; y++) {
  let amountOne = 0;
  let amountZero = 0;
  for (let x = 0; x < input.length; x++) {
    input[x][y] === "1" ? amountOne++ : amountZero++;
  }
  if (amountOne > amountZero) {
    gammaRate.push("1");
    epsilonRate.push("0");
  }
  if (amountZero > amountOne) {
    gammaRate.push("0");
    epsilonRate.push("1");
  }
}

const res = parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2);

console.log(res);

// res2 = ox * co
