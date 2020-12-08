const fs = require('fs')
const path = require('path')

//getting input from txt file
let input = fs.readFileSync(path.resolve(__dirname, 'inputDay2.txt'), 'utf8')


//modify input for easy work
input = input.split('\n')
input = input.map(x => {
    x = x.split(' ')
    let range = x[0].split('-')
    return ({
        min: parseInt(range[0]),
        max: parseInt(range[1]),
        letter: x[1][0],
        password: x[2].split('')
    })
})

//test input
// console.log(input)

//check for an input case
const isValid = (inputCase) => {
    const { min, max, letter, password } = inputCase
    let counter = 0;
    for (const passLetter of password) {
        passLetter === letter && counter++
    }
    return counter <= max && counter >= min ? true : false
}

//test
// console.log(isValid(input[43]))

//check and count all input cases
const countValidPasswords = (input) => {
    let counter = 0;
    for (const testCase of input) {
        isValid(testCase) && counter++
    }
    return counter
}



//question part b validation
const isValid2 = (inputCase) => {
    const { min, max, letter, password } = inputCase

    if (
        (password[min - 1] === letter && password[max - 1] !== letter) || (password[max - 1] === letter && password[min - 1] !== letter)
    ) {
        return true
    } else {
        return false
    }
}

const countValidPasswords2 = (input) => {
    let counter = 0;
    for (const testCase of input) {
        isValid2(testCase) && counter++
    }
    return counter
}

// console.log(countValidPasswords(input))
console.log(countValidPasswords2(input))

