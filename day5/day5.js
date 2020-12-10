const input = require('fs')
  .readFileSync('input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map((i) => ({ row: i.slice(0, 7), column: i.slice(7, 10) }));

// input : {row:'BFFFBBF' column:'RLR' }

const findRow = (rowStr) => {
  let rows = []; // [0,1,2,3,4...127]
  for (let i = 0; i < 128; i++) {
    rows.push(i);
  }

  for (let i = 0; i < rowStr.length; i++) {
    if (rows.length === 2) {
      if (rowStr[i] === 'F') {
        return rows[0];
      } else {
        return rows[1];
      }
    }

    if (rowStr[i] === 'F') {
      rows = rows.slice(0, rows.length / 2);
    } else {
      rows = rows.slice(rows.length / 2, rows.length);
    }
  }
};

const findColumn = (columnStr) => {
  let columns = []; // [0,1,2,3,4...7]
  for (let i = 0; i < 8; i++) {
    columns.push(i);
  }

  for (let i = 0; i < columnStr.length; i++) {
    if (columns.length === 2) {
      if (columnStr[i] === 'L') {
        return columns[0];
      } else {
        return columns[1];
      }
    }

    if (columnStr[i] === 'L') {
      columns = columns.slice(0, columns.length / 2);
    } else {
      columns = columns.slice(columns.length / 2, columns.length);
    }
  }
};

const findSitId = (ticket) => {
  const row = findRow(ticket.row);
  const column = findColumn(ticket.column);
  return row * 8 + column;
};

const findHighestId = (list) => {
  let highest = 0;
  for (const ticket of list) {
    let id = findSitId(ticket);
    if (id > highest) {
      highest = id;
    }
  }
  return highest;
};

console.log(findHighestId(input));
//row
//first 7 chars => F || B
//0-127
//F => LOWER
//B => HIGHER

//column
//0-7
//last 3 chars => L || R
//L => LOWER
//R => HIGHER

//ID = (row * 8) + column

//TESTS
// BFFFBBFRRR: row 70, column 7, seat ID 567. {row:'BFFFBBF', column:'RRR' }
// FFFBBBFRRR: row 14, column 7, seat ID 119. {row:'FFFBBBF', column:'RRR' }
// BBFFBBFRLL: row 102, column 4, seat ID 820. {row:'BBFFBBF', column:'RLL' }
