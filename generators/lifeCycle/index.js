const ByuiConfig = require('../ByuiConfig.js');

const lifeCycleSubGenerators = [
  'capture',
  'keyComponents'

];

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

    this.lifeCycleSubGenerators = lifeCycleSubGenerators;

  }

  initializing() {
    this.log("lifecycle reporting in");
    var that = this;
    this.lifeCycleSubGenerators.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: JSON.stringify(that.options.byuiOptions)
      });

    }, that);

  }

  prompting() {

    if (!this.options.byuiOptions.prompt) {

    }

  }


};
