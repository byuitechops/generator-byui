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

  }

  initializing() {
    var that = this;
    this.log("logging from setup", this.generatorVersion);
    this.subGeneratorsToRun.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: JSON.stringify(that.options.byuiOptions)
      });

    }, that);

  }

  prompting() {

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
