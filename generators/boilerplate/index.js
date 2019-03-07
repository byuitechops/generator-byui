const ByuiConfig = require('../ByuiConfig.js');

module.exports = class Boilerplate extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {
    this.log("boilerplate reporting in");

  }

  async prompting() {
    if (!this.options.byuiOptions.prompt) {
      return this.prompt(this.questions).then(answers => {
        this.options.byuiOptions.prompt = answers;
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }

  }

  configuring() {


  }

  //Default functions are run here

  writing() {


  }

  conflicts() {


  }

  install() {


  }

  end() {


  }

};
