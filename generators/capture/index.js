const ByuiConfig = require('../ByuiConfig.js');

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);


  }

  initializing() {

  }

  prompting() {

    var questionsToAsk = [this.questions.projectName];

    if (!this.options.byuiOptions.prompt) {
      return this.prompt(questionsToAsk).then(answers => {
        this.options.byuiOptions.prompt = answers;
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }

  }

  configuring() {
    //Run the update logic if the update flag is found
    if (this.options.update) {
      this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.projectCapture);
    }
  }

  //Default functions are run here

  writing() {
    this.fs.copyTpl(
      this.templatePath(`capture.md`),
      this.destinationPath(this.filenames.projectCapture),
      this.options.byuiOptions.prompt

    );
  }

  conflicts() {


  }

  install() {


  }

  end() {


  }


};
