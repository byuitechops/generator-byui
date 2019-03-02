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

    //Load the configs from the parent class into the byuiOptions object
    if (!this.byuiOptions) {
      this.byuiOptions = this.configs;
    }
  }

  initializing() {
    var that = this;
    this.log("logging from setup", this.generatorVersion);
    subGeneratorsToRun.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: JSON.stringify(that.byuiOptions)
      });

    }, that);




  }


};
