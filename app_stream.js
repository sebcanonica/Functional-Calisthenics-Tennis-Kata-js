
const {TennisGame} = require('./lib/playGame');
const readline = require('readline');

function consoleSource(lineReader) {
    function askWinner(resolveWinner) {
        return lineReader.question('Winner (1 | 2)?', resolveWinner);
    }
    return askWinner;
}

function createWinnerSource() {
    return consoleSource( readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }))
}

function consoleOutput(display) {
    return console.log(display);
}

TennisGame()
    .withWinnerSource( createWinnerSource() )
    .withOutput(consoleOutput)    
    .withTermination(process.exit)
    .play();