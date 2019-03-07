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

    //Add prompt key to this.options.byuiOptions (This is necessary to keep all the subgenerators from prompting as well).
    this.options.byuiOptions.prompt = "prompt will be taking place in SetUp generator";


  }

  initializing() {
    var that = this;
    this.log("logging from setup", this.generatorVersion);
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
