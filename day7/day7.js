const input = require('fs')
  .readFileSync('input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map((i) => {
    i = i.split(' contain ');
    i[1] = i[1].replace('.', '').split(', ');
    return i;
  });

// console.log(input);

// loops
// 1. list of all bag types can hold gold bag.
// 2. check if it have one of this types

const getBigest = (list) => {
  let result = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i][1].length > result) {
      result = list[i][1].length;
    }
  }
  return result;
};

const countBags = (list) => {
  const canHoldGold = new Set([]);
  const looplength = getBigest(list);
  for (let i = 0; i < looplength; i++) {
    for (let j = 0; j < list.length; j++) {
      const bags = list[j][1];
      for (const bag of bags) {
        if (bag.includes(`shiny gold bag`)) {
          canHoldGold.add(list[j][0]);
        } else {
          for (const holder of canHoldGold) {
            if (bag.includes(`${holder}`)) {
              canHoldGold.add(list[j][0]);
            }
          }
        }
      }
    }
  }

  console.log(canHoldGold.size);
  console.log(canHoldGold);
};

countBags(input);
