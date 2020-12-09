const mustHave = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const input = require('fs')
  .readFileSync('input.txt', { encoding: 'utf8' })
  .split('\n\r')
  .map((i) => i.split(/\s+/g).filter((j) => j !== ''));

let passports = [];

for (const passport of input) {
  newPassport = {};
  passport.map((str) => {
    let data = str.split(':');
    newPassport[data[0]] = data[1];
  });
  passports.push(newPassport);
}

const isPassportValid = (passport) => {
  let counter = 0;
  for (let i = 0; i < mustHave.length; i++) {
    Object.keys(passport).includes(mustHave[i]) && counter++;
  }
  if (counter >= mustHave.length) {
    return true;
  } else {
    return false;
  }
};

const numberOfValid = (list) => {
  let counter = 0;
  for (const passport of list) {
    isPassportValid(passport) && counter++;
  }
  return counter;
};

console.log(numberOfValid(passports));
