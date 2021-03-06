const ByuiConfig = require('../ByuiConfig.js');

const subGeneratorsToRun = [
  'readme',
  'packageJson',
  'license',
  'boilerplate',
  'lifeCycle',
];

module.exports = class SetUp extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    await super.initializing();
    this.subGeneratorsToRun = subGeneratorsToRun;
    //Must push the name of the generator onto this list, so sub generators, know they have been
    //called from another generator
    this.options.byuiOptions.stackOfGeneratorsCalled.push('SetUp');

    var that = this;
    this.subGeneratorsToRun.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: that.options.byuiOptions
      });

    }, that);

  }

  async prompting() {

    //Set up questions object
    var questionsToAsk = [this.questions.projectName, this.questions.codeTemplate, this.questions.author, this.questions.stakeholders];

    //Ask the questions
    return this.prompt(questionsToAsk).then(answers => {
      //Store the prompt results in the byuiOptions object
      this.options.byuiOptions.prompt = answers;
      //Add Prompt values to fillTemplateObject.  The fillTemplateObject is first defined in runCompleteSetUp.js
      Object.assign(this.options.byuiOptions.fillTemplateObject, answers);
    }).catch(e => {
      this.log("Error when prompting: ", e.message);
    });
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
