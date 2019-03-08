const ByuiConfig = require('../ByuiConfig.js');

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);


  }

  initializing() {

  }

  prompting() {

    var questionsToAsk = [this.questions.projectName];
    this.log(this.options.byuiOptions.stackOfGeneratorsCalled);
    if (this.options.byuiOptions.stackOfGeneratorsCalled.length === 0) {
      return this.prompt(questionsToAsk).then(answers => {
        this.options.byuiOptions.prompt = answers;
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }

  }

  configuring() {
    //Run the update logic if the update flag is found
    if (this.options.byuiOptions.update) {
      this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.projectCapture);
    }

    //Add Prompt values to fillTemplateObject.  The fillTemplateObject is first defined in runCompleteSetUp.js
    Object.assign(this.options.byuiOptions.fillTemplateObject, this.options.byuiOptions.prompt);

  }

  //Default functions are run here

  writing() {
    this.fs.copyTpl(
      this.templatePath('ProjectCaptureDoc.md'),
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
