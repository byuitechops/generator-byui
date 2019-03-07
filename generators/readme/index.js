const ByuiConfig = require('../ByuiConfig.js');

module.exports = class ReadMe extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  initializing() {
    this.log("readMe reporting in");

  }

  async prompting() {

    var questionsToAsk = [this.questions.projectName];
    if (!this.options.byuiOptions.prompt) {
      this.log("We should not be in here");
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
      this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.readMe);
    }
  }

  //Default functions are run here

  writing() {
    this.fs.copyTpl(
      this.templatePath(`README.ejs`),
      this.destinationPath(this.filenames.readMe),
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
