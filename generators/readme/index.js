const ByuiConfig = require('../ByuiConfig.js');

module.exports = class ReadMe extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {
    this.log("readMe reporting in");

  }

  prompting() {

    if (!this.options.byuiOptions.prompt) {

    }

  }
  configuring() {

    //Run the update logic if the update flag is found
    if (this.update) {
      this.byuiGeneratorTools.updateFile('readme');
    }

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
