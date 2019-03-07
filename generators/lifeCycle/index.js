const ByuiConfig = require('../ByuiConfig.js');

const lifeCycleSubGenerators = [
  'capture',
  'keyComponents'

];

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

    this.lifeCycleSubGenerators = lifeCycleSubGenerators;

    if (!this.options.byuiOptions.prompt) {
      this.options.byuiOptions.prompt = "This prompt needs to be in place, so the sub generators do not prompt";
    }

  }

  initializing() {
    this.log("lifecycle reporting in");
    var that = this;
    this.lifeCycleSubGenerators.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: that.options.byuiOptions
      });

    }, that);

  }

  prompting() {

    if (!this.options.byuiOptions.prompt) {
      return this.prompt(this.questions).then(answers => {
        this.options.byuiOptions.prompt = answers;
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }


  }


};
