
/*
logic for the RPN calculator
*/
var ops = require('./operations');
const validNumber = new RegExp("^[0-9]+\.?[0-9]*");

/**
 * Reverse Polish Notation Calculator class
 * supporting the operations +, -, *, /
 * automatically converts operands to floating point
 */
class Calculator {
        constructor(display, runningTotal, operands, operandCount, hasRunningTotal) {
        this.display = display || 0;
        this.runningTotal = runningTotal || 0;
        this.operands = operands || [];
        this.operandCount = operandCount || 0;
        this.hasRunningTotal = hasRunningTotal || false;
    }

    //class methods for determining calculator state
    isAcceptingOperand() {return this.operandCount < 2 }
    isOperable() {return (this.operandCount == 2) ? true : (this.hasRunningTotal && this.operandCount == 1)}
    //helper method for swapping 1st & 2nd operand when using the running total as 1st
    useRunningTotalAsFirstOperand() {
        this.operands[1] = this.operands[0]
        this.operands[0] = this.runningTotal
    }
    /**
     * Resets the calculator state to default values
     */
    resetCalculator() {this.display = 0; this.runningTotal = 0; this.operands = []; this.operandCount = 0; this.hasRunningTotal = false;}
    /**
     * parses a string for calculations in RPN format,
     * executes callback with error if any as the first parameter,
     * calculated result as the second parameter
     * @param {string} entry 
     * @param {function} callback 
     */
    parse(entry, callback) {
    let result, err, inputBuffer = entry && entry.split(" ").map(text=>text.trim());
    inputBuffer.forEach((datum) => {
            if(validNumber.test(datum) && this.isAcceptingOperand()) {
                this.operands.push(parseFloat(datum))
                this.operandCount++
                this.display = datum
                result = this.display
            } 
            else if (ops.filter(x=>x.representation == datum).length && this.isOperable() ) {
                let operation = ops.filter(x=>x.representation == datum)[0]
                if(this.operandCount == 1) this.useRunningTotalAsFirstOperand()
                this.runningTotal = operation.exec(this.operands[0], this.operands[1])
                this.display = this.runningTotal
                result = this.display
                this.operandCount = 0
                this.operands = []
                this.hasRunningTotal = true
            }
            else {
                err = 'Invalid input'
                this.resetCalculator()
            }
        })
        if(err) callback(err)
        else callback(null, result)
    }
}

module.exports = Calculator