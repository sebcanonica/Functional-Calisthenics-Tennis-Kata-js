const readline = require('readline');

const playGame = require('./lib/playGame');

function consoleInput(lineReader) {
    function askWinner(resolveWinner) {
        lineReader.question('Winner (1 | 2)?', resolveWinner);
    }
    return askWinner;
}

function consoleOutput(display) {
    return console.log(display);
}

playGame({
    score: { p1:0, p2:0 },
    io: {
        output : consoleOutput,
        input : consoleInput(readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })),
        then: process.exit
    }
});


