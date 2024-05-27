// 1. Deposit some money
// 2. Determine numbe rof lines to bet
// 3. Collect a bet amount
// 4. spin the slot machine
// 5. check if user won
// 6. give the user their winnings
// 7. play again

//1

//prompt sync to get user input
const prompt = require("prompt-sync")();

//4 // commmonly global variables are const , capital
const ROWS =  3;
const COLS = 3;

const SYMBOLS_COUNT = { //object
    A: 2,
    B: 4,
    C: 6,
    D: 8
}
const SYMBOL_VALUES = {
    A: 5,  // if I have a row of A, the value will be multiplied by 5.
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    // prompt by default returns a string
    // "hello" => NaN
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid Deposit Amount, Try Again.")
    } else {
    return numberDepositAmount;
    }
}
};

//2 
const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter a number of lines to bet on (1-3): ");
        const numberOfLines= parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, Try Again.")
        } else {
        return numberOfLines;
        }
    }
}

//3
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");

        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance/lines)){
            console.log("Invalid Bet Amount, Try Again.")
        } else {
        return numberBet;
        }
    }
}

const spin = () =>{
    const symbols = []; // I can add values to thsi const array, why?
    // because in JavaScript an array is known as a reference data type, which means I can manipulate 
    // whats inside of the array without changign the reference to the array itself.
    // i can add stuff into this array.

    // create an array of all available symbols
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        // loop through each entry
        for(let i = 0; i < count; i++)
            symbols.push(symbol);
    }
    const reels = [] // will have in each column an array == each array represents a column 
    for (let j = 0; j < COLS; j++){
        reels.push([]); // add column
        const reelSymbols = [...symbols]; //  spread operator (...) to create a shallow copy of the array symbols 
        // and assigns it to the constant variable reelsymbols

        for (let k = 0; k < ROWS; k++){ // loop through all of hte rows
            const randomIndex = Math.floor(Math.random()*reelSymbols.length) // we randomely generate and pick of the available symbols
                const selectedSymbol = reelSymbols[randomIndex];
                reels[j].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1); // remove one element, so we don't select it again
        }
            
    }
    return reels;
}

// we want an array that has all of the rows, the nwe can check who is winning 
// this is called transposing a matrix[2D array]
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]); // for every row, loop through each column
        for(let j = 0; j<COLS ; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printRows = (rows) =>{
    for (const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){ // i: index , symbol: element
            rowString += symbol;
            if (i != row.length -1 )
                rowString += ' | ';
        }
        console.log(rowString)
    }
}

//5 
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines ; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){ // if all the symbols are the same
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}
//6

const game = () => {
    let balance = deposit();


    while(true){
            console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
            balance -= bet*numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
            balance += winnings;
        console.log("You Won, $" + winnings.toString())
        if (balance <= 0){
            console.log("You ran out of money!");
            break;
        }
        const palyAgain = prompt("Do you want to paly again (y/n)?")
        if (palyAgain != 'y') break;
    }
}

game();
