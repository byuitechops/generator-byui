const ByuiConfig = require('../ByuiConfig.js');

module.exports = class ReadMe extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {

  }

  async prompting() {

    var questionsToAsk = [this.questions.projectName];
    if (this.options.byuiOptions.stackOfGeneratorsCalled.length === 0) {
      return this.prompt(questionsToAsk).then(answers => {
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
      this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.readMe);
    }


  }

  //Default functions are run here

  writing() {
    this.fs.copyTpl(
      this.templatePath(this.filenames.readMe),
      this.destinationPath(this.filenames.readMe),
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
