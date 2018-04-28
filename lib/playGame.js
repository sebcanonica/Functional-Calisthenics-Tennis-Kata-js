 function playGame(game) {
    if (isEndGame(game.score)) {
        return game.io.then();
    } else {
        function winPoint(winner) {
            function addPointToScore() {
                if (winner == 1) {
                    return { p1: game.score.p1+1, p2: game.score.p2 };
                } else {
                    return { p1: game.score.p1, p2: game.score.p2+1 };
                }
            }
            playGame( {
                io: game.io,
                score: addPointToScore(),
                output: game.io.output( getDisplay( addPointToScore() ))
            } );
        }
        return game.io.input( winPoint );
    }
}

function getDisplay(score) {
    if (isEndGame(score)) {
        return 'Winner ' + playerNameWithMostPoint(score);
    } else if (score.p1 >= 3 && score.p2 >= 3) {
        if (score.p1 == score.p2) {
            return 'Deuce';
        } else {
            return 'Advantage ' + playerNameWithMostPoint(score);
        }
    } else {
        return displayBasePoint(score.p1) + ' - ' + displayBasePoint(score.p2);
    }
}

function isEndGame(score) {
    return ( score.p1 >= 4 || score.p2 >= 4 || (score.p1 >= 3 && score.p2 >= 3) )
           && Math.abs(score.p1 - score.p2) >= 2;
}

function playerNameWithMostPoint(score) {
    if (score.p1 > score.p2) {
        return 'P1';
    } else {
        return 'P2';
    }
}

function displayBasePoint(number) {
    switch (number) {
        case 0: return 'Love';
        case 1: return 'Fifteen';
        case 2: return 'Thirty';
        default: return 'Forty';
    }
}

module.exports = playGame;