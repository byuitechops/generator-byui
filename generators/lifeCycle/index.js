const ByuiConfig = require('../ByuiConfig.js');

const lifeCycleSubGenerators = [
  'capture',
  'keyComponents'

];

module.exports = class LifeCycle extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

    this.lifeCycleSubGenerators = lifeCycleSubGenerators;
    //Must push the name of the generator onto this list, so subgenerators, know they have been
    //called from another generator
    this.options.byuiOptions.stackOfGeneratorsCalled.push('LifeCycle');
  }

  initializing() {

    var that = this;
    this.lifeCycleSubGenerators.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: that.options.byuiOptions
      });

    }, that);

  }

  prompting() {

    var questionsToAsk = [this.questions.projectName];

    //We have pushed one generator onto the stack of generators array.
    //If there are more generators, then this generator is getting called from another
    //generator.
    if (this.options.byuiOptions.stackOfGeneratorsCalled.length === 1) {
      return this.prompt(questionsToAsk).then(answers => {
        this.options.byuiOptions.prompt = answers;
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }


  }
  configuring() {

  }


};
