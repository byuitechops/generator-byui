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

  async initializing() {
    await super.initializing();
    var that = this;
    this.lifeCycleSubGenerators.forEach(function (subGenerator) {
      that.composeWith(require.resolve(`../${subGenerator}`), {
        byuiOptions: that.options.byuiOptions
      });

    }, that);

  }

  async prompting() {

    var questionsToAsk = [this.questions.projectName, this.questions.author, this.questions.stakeholders];
    if (this.options.byuiOptions.stackOfGeneratorsCalled.length === 1) {
      return this.prompt(questionsToAsk).then(answers => {
        //Store the prompt results in the byuiOptions object
        this.options.byuiOptions.prompt = answers;
        //Add Prompt values to fillTemplateObject.  The fillTemplateObject is first defined in runCompleteSetUp.js
        Object.assign(this.options.byuiOptions.fillTemplateObject, answers);
      }).catch(e => {
        this.log("Error when prompting: ", e.message);
      });
    }
  }
  configuring() {

  }


};
