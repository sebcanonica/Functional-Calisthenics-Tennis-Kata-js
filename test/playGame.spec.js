const playGame = require('../lib/playGame');

describe( 'Tennis game acceptance', () => {
    it('should play a tennis game', (done) => {
        const scenario = [1,2,1,1,2,2,2,1,1,1];
        const actual = [];
        playGame({
            score: { p1:0, p2:0 },
            io: {
                input: (resolveWinner) => { resolveWinner( scenario.shift() ); },
                output: (display) => {
                    //actual.push(decoratedScore.display);
                    //return { passthru: decoratedScore };
                    actual.push(display);
                    return display;
                },
                then: () => {
                    expect(actual.join(', ')).toBe([
                        'Fifteen - Love',
                        'Fifteen - Fifteen',
                        'Thirty - Fifteen',
                        'Forty - Fifteen',
                        'Forty - Thirty',
                        'Deuce',
                        'Advantage P2',
                        'Deuce',
                        'Advantage P1',
                        'Winner P1'
                    ].join(', '));
                    done();
                }
            }
        });
    });

    [
        { p1Score: 3, p2Score: 0, pointWinner:1, actual: 'Winner P1'},
        { p1Score: 0, p2Score: 3, pointWinner:2, actual: 'Winner P2'},
        { p1Score: 3, p2Score: 4, pointWinner:2, actual: 'Winner P2'}
    ].forEach( ({p1Score, p2Score, pointWinner, actual}) => {
        it('should detect proper win conditions', (done) => {
            playGame({
                score: { p1:p1Score, p2:p2Score },
                io: {
                    input: (resolveWinner) => { resolveWinner( pointWinner ); },
                    output: (display) => {
                        expect(display).toBe(actual);
                        return display;
                    },
                    then: () => {
                        done();
                    }
                }
            });
        })
    });
})