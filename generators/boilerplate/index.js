const ByuiConfig = require('../ByuiConfig.js');

module.exports = class Boilerplate extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {

  }

  async prompting() {

    var questionsToAsk = [this.questions.codeTemplate];
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


  }

  //Default functions are run here

  writing() {


    //Write main.js file
    this.fs.copyTpl(
      this.templatePath(`${this.options.byuiOptions.fillTemplateObject.codeTemplate}/${this.filenames.mainJs}`),
      this.destinationPath(this.filenames.mainJs),
      this.options.byuiOptions.fillTemplateObject
    );

    //Write bin.js file
    this.fs.copyTpl(
      this.templatePath(`${this.options.byuiOptions.fillTemplateObject.codeTemplate}/${this.filenames.binJs}`),
      this.destinationPath(this.filenames.binJs),
      this.options.byuiOptions.fillTemplateObject
    );

    //Write test.js file
    this.fs.copyTpl(
      this.templatePath(`${this.options.byuiOptions.fillTemplateObject.codeTemplate}/${this.filenames.testJs}`),
      this.destinationPath(this.filenames.testJs),
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
