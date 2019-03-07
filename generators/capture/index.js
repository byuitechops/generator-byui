const ByuiConfig = require('../ByuiConfig.js');

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);


  }

  initializing() {
    this.log("capture reporting in");
  }

  prompting() {

    if (!this.options.byuiOptions.prompt) {
      this.log("Capture Prompt");
      return this.prompt(this.questions).then(answers => {
        this.options.byuiOptions.prompt = answers;
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }

  }

  configuring() {
    //Run the update logic if the update flag is found
    if (this.options.update) {
      this.byuiGeneratorTools.updateFile('capture');
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
