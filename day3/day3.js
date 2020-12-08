const input = require('fs').readFileSync('input.txt', 'utf8');

const field = input.split('\n').map((i) => i.split(''));

const countTrees = (input) => {
  const rowLength = input[0].length - 1;
  let treeCounter = 0;
  let currentRow = 0;

  for (let i = 0; i < input.length; i++) {
    input[i][currentRow] === '#' && treeCounter++;
    currentRow = (currentRow + 3) % rowLength;
  }

  return treeCounter;
};

// console.log(countTrees(field));

const countTrees2 = (input, right, down) => {
  const rowLength = input[0].length - 1;
  let treeCounter = 0;
  let currentRow = 0;

  for (let i = 0; i < input.length; i += down) {
    input[i][currentRow] === '#' && treeCounter++;
    currentRow = (currentRow + right) % rowLength;
  }

  return treeCounter;
};

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const allTreesEncounter = () => {
  let res = 1;
  for (const slope of slopes) {
    res *= countTrees2(field, slope.right, slope.down);
  }
  return res;
};

console.log(allTreesEncounter());
