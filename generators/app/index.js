const ByuiConfig = require('../ByuiConfig.js');

const subGeneratorsToRun = [
  'readme',
  'packageJson',
  'license',
  'boilerplate',
  'lifeCycle',
];

var listOfCodeTemplates = [
  'sync',
  'promises',
  'callbacks',
];


module.exports = class SetUp extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

    this.subGeneratorsToRun = subGeneratorsToRun;
    this.codeTemplates = listOfCodeTemplates;
    //Must push the name of the generator onto this list, so subgenerators, know they have been
    //called from another generator
    this.options.byuiOptions.stackOfGeneratorsCalled.push('SetUp');
  }

  initializing() {
    var that = this;
    this.subGeneratorsToRun.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: that.options.byuiOptions
      });

    }, that);

  }

  async prompting() {

    //Set up questions object
    var questionsToAsk = [this.questions.projectName, this.questions.jsTemplate];

    //Ask the questions
    return this.prompt(questionsToAsk).then(answers => {
      this.options.byuiOptions.prompt = answers;
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
