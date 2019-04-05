const ByuiConfig = require('../ByuiConfig.js');

module.exports = class Release extends ByuiConfig {
    constructor(args, opts) {
        super(args, opts);
    }

    async initializing() {
        await super.initializing();
    }

    async prompting() {
        var that = this;
        const simpleGit = require('simple-git');
        return new Promise((resolve, reject) => {
            let branches;
            await simpleGit().branch((err, branchSummary) => {
                if (err) throw new Error(err.message);
                branches = Object.keys(branchSummary.branches);
            });
            branches = branches.filter(branch => !branch.includes('/'));
            resolve(branches);
        }).then(branches => {
            var questionsToAsk = [{
                name: 'branch',
                type: 'input',
                message: questionTools.messagePadEnd('What branch is being merged'),
                suffix: ':',
                validate: value => branches.includes(value) ? true : "That branch doesn't exist"
            }];
            that.prompt(questionsToAsk).then(answers => {
                await simpleGit()
                    .push('origin', answers.branch)
                    .checkout('master', (err) => { if (err) throw new Error(err.message) })
                    .mergeFromTo(answers.branch, 'master', (err) => { if (err) throw new Error(err.message) })
                    .push('origin', 'master');
            });
        }).catch(e => that.log("Error releasing."));
    }

    //async prompting() {
    //  const simpleGit = require('simple-git');
    // Find all branches of current repo
    /* THIS IS A SINGLE FUNCTION
    let branches;
    await simpleGit().branch((err, branchSummary) => {
        if (err) throw new Error(err.message);
        branches = Object.keys(summary.branches);
    });
    branches = branches.filter(branch => !branch.includes('/'));
    */

    // Prompt user for branch to merge to master
    /* THIS IS A SINGLE FUNCTION
    var questionsToAsk = [{
        name: 'branch',
        type: 'input',
        message: questionTools.messagePadEnd('What branch is being merged'),
        suffix: ':',
        validate: value => branches.includes(value) ? true : "That branch doesn't exist"
    }];
    this.prompt(questionsToAsk).then(answers => {
        await simpleGit()
            .push('origin', answers.branch)
            .checkout('master', (err) => { if (err) throw new Error(err.message) })
            .mergeFromTo(answers.branch, 'master', (err) => { if (err) throw new Error(err.message) })
            .push('origin', 'master');
    });
    */
    //}
};