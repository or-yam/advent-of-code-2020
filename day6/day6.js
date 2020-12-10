//a-z
const input = require('fs')
  .readFileSync('input.txt', { encoding: 'utf8' })
  .split('\n\r')
  .map((i) => i.split(/\s+/g).filter((j) => j !== ''));

const countYes = (group) => {
  //group : array of person answers as string of letters
  const letters = {};
  for (const person of group) {
    for (let i = 0; i < person.length; i++) {
      let letter = person.charAt(i);
      if (!letters[letter]) {
        letters[letter] = 'yes';
      }
    }
  }
  return Object.keys(letters).length;
};

const countAll = (list) => {
  let counter = 0;
  for (const group of list) {
    counter += countYes(group);
  }
  return counter;
};

console.log(countAll(input));
