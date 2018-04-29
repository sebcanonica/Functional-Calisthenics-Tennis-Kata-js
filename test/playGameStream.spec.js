const {fromScore} = require('../lib/playGame');

describe( 'Tennis stream-like acceptance', () => {
    it('should play a tennis game', (done) => {
        const scenario = [1,2,1,1,2,2,2,1,1,1];
        var actual = [];
        fromScore({p1:0,p2:0})
        .withWinnerSource( resolveWinner => { resolveWinner( scenario.shift() ); } )
        .withOutput( display => {
            actual.push(display);
            return display;
        })
        .withTermination(() => {
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
        })
        .play();        
    });  
})