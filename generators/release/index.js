const ByuiConfig = require('../ByuiConfig.js');
const simpleGit = require('simple-git');

module.exports = class Release extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);
  }

  async initializing() {
    await super.initializing();
    try {
      let branches;
      return simpleGit().branch((err, branchSummary) => {
        if (err) throw new Error("Error identifying branches of current repository.");
        branches = Object.keys(branchSummary.branches);

        branches = branches.filter(branch => !branch.includes('/'));
        this.branches = branches;
      });
    } catch (err) {
      this.log(err.message);
    }
  }

  async prompting() {
    var questionsToAsk = [this.questions.branch];
    questionsToAsk[0].choices = this.branches;
    this.prompt(questionsToAsk).then(answers => {
      this.branchToMerge = answers.branch;
    }).catch(e => this.log("Error prompting for branch."));
  }

  async release() {
    try {
      return simpleGit()
        .push('origin', this.branchToMerge)
        .checkout('master', (err) => {
          if (err) throw new Error("Error checking out master branch")
        })
        .mergeFromTo(this.branchToMerge, 'master', (err) => {
          if (err) throw new Error(`Error merging ${this.branchToMerge} to master.`)
        })
        .push('origin', 'master');
    } catch (err) {
      this.log("Error releasing:", err.message);
    }
  }
};
