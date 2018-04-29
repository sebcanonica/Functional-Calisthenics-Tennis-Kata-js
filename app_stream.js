
const {fromScore} = require('./lib/playGame');
const readline = require('readline');

function consoleSource(lineReader) {
    function askWinner(resolveWinner) {
        lineReader.question('Winner (1 | 2)?', resolveWinner);
    }
    return askWinner;
}

function consoleOutput(display) {
    return console.log(display);
}


fromScore({p1:0,p2:0})
    .withWinnerSource( consoleSource( readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })))
    .withOutput(consoleOutput)
    .withTermination(process.exit)
    .play();