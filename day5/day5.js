const input = require('fs')
  .readFileSync('input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map((i) => ({ row: i.slice(0, 7), column: i.slice(7, 10) }));

// input : {row:'BFFFBBF' column:'RLR' }

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

let sits = [];
for (let i = 0; i < 128; i++) {
  let col = [];
  sits.push(col);
  for (let j = 0; j < 8; j++) {
    col.push('*');
  }
}

const findAllSeats = (list) => {
  list.pop();
  for (const ticket of list) {
    const row = findRow(ticket.row);
    const column = findColumn(ticket.column);
    sits[row][column] = 1;
  }
};

const findMySit = () => {
  findAllSeats(input);
  // console.log(sits);
  for (let i = 1; i < sits.length - 1; i++) {
    for (let j = 0; j < sits[i].length; j++) {
      if (sits[i][j] !== 1) {
        console.log(i, j);
      }
    }
  }
};
findMySit();
//got the middle one 92,5
console.log(92 * 8 + 5);
