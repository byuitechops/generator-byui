const ByuiConfig = require('../ByuiConfig.js');

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {
    this.log("keyComponents reporting in");

  }

  prompting() {

    var questionsToAsk = [this.questions.projectName];

    if (this.options.byuiOptions.stackOfGeneratorsCalled === []) {
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
      this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.keyComponents);
    }
  }

  //Default functions are run here

  writing() {
    this.fs.copyTpl(
      this.templatePath(`KeyComponentsDoc.md`),
      this.destinationPath(this.filenames.keyComponents),
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
