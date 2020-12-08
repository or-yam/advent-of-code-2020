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

console.log(countTrees(field));
