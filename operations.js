/*
operations supported by the calculator
*/

module.exports = [
        {
            name: 'addition',
            representation: '+',
            exec: (x, y) => x + y
        },
        {
            name: 'subtraction',
            representation: '-',
            exec: (x, y) => x - y
        },
        {
            name: 'division',
            representation: '/',
            exec: (x, y) => x / y
        },
        {
            name: 'multiplication',
            representation: '*',
            exec: (x, y) => x * y
        }
    ]