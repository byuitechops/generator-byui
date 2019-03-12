const ByuiConfig = require('../ByuiConfig.js');

module.exports = class Capture extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    await super.initializing();
  }

  async prompting() {

    var questionsToAsk = [this.questions.projectName, this.questions.author, this.questions.stakeholders];
    if (this.options.byuiOptions.stackOfGeneratorsCalled.length === 0) {
      return this.prompt(questionsToAsk).then(answers => {
        //Store the prompt results in the byuiOptions object
        this.options.byuiOptions.prompt = answers;
        //Add Prompt values to fillTemplateObject.  The fillTemplateObject is first defined in runCompleteSetUp.js
        Object.assign(this.options.byuiOptions.fillTemplateObject, answers);
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
      this.templatePath(this.filenames.projectCapture),
      this.destinationPath(this.filenames.projectCapture),
      this.options.byuiOptions.fillTemplateObject

    );
  }

  conflicts() {


  }

  install() {


  }

  end() {


  }


};
