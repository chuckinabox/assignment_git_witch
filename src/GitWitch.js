const commandRunner = require('../src/CommandRunner')();
const questionParser = require('../src/QuestionParser')();
const responseFormatter = require('../src/ResponseFormatter')();

const GitWitch = function () {
  const gitWitch = {
    process: function (input) {
      return (new Promise ( (resolve,reject) => {
        var results = this.parser(input);
        if (results === 'Invalid input') {
          reject(results);
        }
        else {
          resolve ( this.parser(input) );
        }
      }).then ( (result) => {
        return ( this.runner(result) );
      }).then ( (result) => {
        return( this.formatter(result) );
      }))
    },
    parser: function (input) {
      const output = questionParser.parse(input);
      if (output.name === 'none') {
        return ('Invalid input')
      }
      return(output);
    } ,
    runner: function (input) {
      const output = commandRunner.run(input.username);
      input.results = output;
      return input;
    },
    formatter: function (input) {
      const outputList = responseFormatter.format(input);
      return outputList;
    }
  }
  return gitWitch;
}

module.exports = GitWitch;