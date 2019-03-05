const ByuiConfig = require('../ByuiConfig.js');

module.exports = class Boilerplate extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {
    this.log("boilerplate reporting in");

  }

  prompting() {

    if (!this.options.byuiOptions.prompt) {

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
