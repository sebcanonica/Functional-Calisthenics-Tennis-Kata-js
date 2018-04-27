 function playGame(game) {
    if (game.score.endGame) {
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
                score: game.io.output( decorateDisplay( addPointToScore() ) ).passthru
            } );
        }
        return game.io.input( winPoint );
    }
}

function decorateDisplay(score) {
    if (score.p1 >= 3 && score.p2 >= 3) {
        if (score.p1 == score.p2) {
            return { display: 'Deuce', ...score };
        } else if (Math.abs(score.p1 - score.p2) == 1) {
            if (score.p1 > score.p2) {
                return { display: 'Advantage P1', ...score};
            } else {
                return { display: 'Advantage P2', ...score};
            }
        } else {
            if (score.p1 > score.p2) {
                return { display: 'Winner P1', ...score, endGame: true};
            } else {
                return { display: 'Winner P2', ...score, endGame: true};
            }
        }
    } else if ( (score.p1 >= 4 || score.p2 >= 4) && Math.abs(score.p1 - score.p2) >= 2 ) {
        if (score.p1 > score.p2) {
            return { display: 'Winner P1', ...score, endGame: true};
        } else {
            return { display: 'Winner P2', ...score, endGame: true};
        }
    } else {
        return {
            display: displayBasePoint(score.p1) + ' - ' + displayBasePoint(score.p2),
            ...score
        };
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