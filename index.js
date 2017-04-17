/*
CLI interface to a RPN calculator 
exits when input is 'q' or Ctrl+D 
*/

var Calculator = require("./calc")
var rpn = new Calculator();
const resultPrompt = 'result: ', errorPrompt = 'Error: ', inputPrompt = "\ninput expression (type 'q' to quit) > ";

process.stdin.setEncoding('utf8');
process.stdout.write(inputPrompt)

//Only works from the command line
if(process.stdin.isTTY) {
        process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        //check for exit code
        if(chunk && typeof chunk === 'string' && (chunk[0] == `q` || chunk[0] == `\u0004`) ) {
            process.stdout.write('recieved exit code');
            process.exit();
        }
        //normal input processing
        if(chunk) rpn.parse(chunk, (err, result) => {
            if(err) { 
                process.stdout.write(errorPrompt + err + inputPrompt)
            }
            else {
               process.stdout.write(resultPrompt + result + inputPrompt)
            }
            })
        })
}
else process.exit()

