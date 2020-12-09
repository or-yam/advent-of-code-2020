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

// console.log(passports)
//
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

// console.log(numberOfValid(passports));

const checkByr = (byr) =>
  byr.length === 4 && parseInt(byr) >= 1920 && parseInt(byr) <= 2002
    ? true
    : false;

const checkIyr = (iyr) =>
  iyr.length === 4 && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020;

const checkEyr = (eyr) =>
  eyr.length === 4 && parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030;

const checkHgt = (hgt) => {
  let unit = hgt[hgt.length - 2] + hgt[hgt.length - 1];
  let number = parseInt(hgt.slice(0, hgt.length - 2));
  if (unit === 'cm') {
    if (number >= 150 && number <= 193) {
      return true;
    } else {
      return false;
    }
  } else if (unit === 'in') {
    if (number >= 59 && number <= 76) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const checkHcl = (hcl) => {
  if (hcl[0] !== '#' || hcl.length !== 7) {
    return false;
  }
  let test = hcl.slice(1);
  if (!isNaN(Number('0x' + test))) {
    return true;
  } else {
    return false;
  }
};

const checkEcl = (ecl) => {
  const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  for (const color of colors) {
    if (color === ecl) {
      return true;
    }
  }
  return false;
};

const checkPid = (pid) => {
  if (pid.length !== 9) {
    return false;
  }
  pid = pid.split('');
  for (const num of pid) {
    if (parseInt(num) === NaN) {
      return false;
    }
  }
  return true;
};

const checkPassport = (passport) => {
  if (
    checkByr(passport.byr) &&
    checkIyr(passport.iyr) &&
    checkEyr(passport.eyr) &&
    checkHgt(passport.hgt) &&
    checkHcl(passport.hcl) &&
    checkEcl(passport.ecl) &&
    checkPid(passport.pid)
  ) {
    return true;
  } else {
    return false;
  }
};

const isPassportValid2 = (list) => {
  let counter = 0;
  for (const passport of list) {
    if (isPassportValid(passport)) {
      if (checkPassport(passport)) {
        counter++;
      }
    }
  }
  return counter;
};

console.log(isPassportValid2(passports));
