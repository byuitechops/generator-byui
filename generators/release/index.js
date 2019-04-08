const ByuiConfig = require('../ByuiConfig.js');
const simpleGit = require('simple-git');

module.exports = class Release extends ByuiConfig {
    constructor(args, opts) {
        super(args, opts);
    }

    async initializing() {
        await super.initializing();
        var that = this;

        return new Promise(function (resolve, reject) {
            simpleGit().checkIsRepo(function (err, response) {
                if (err) reject(err);
                var found = false;
                //If we are not in a git repository, go ahead and error out.
                if (!response) {
                    reject(new Error("The current directory is not a git repository."));
                } else {
                    simpleGit().branch(function (err, branchSummary) {
                        if (err) reject(err);
                        //If the branches object is empty then throw.
                        if (Object.keys(branchSummary.branches).length === 0) reject(new Error("The current directory contains no branches."));

                        // console.log(branchSummary);

                        //If on master then throw.
                        if (branchSummary.branches['remotes/origin/master'].current || branchSummary.branches.master.current) reject(new Error("Currently checked out on master."));
                        //Find current branch checked out.
                        Object.keys(branchSummary.branches).forEach(branchName => {
                            if (branchSummary.branches[branchName].current && branchName !== 'master' && branchName !== 'remotes/origin/master') {
                                that.branchToMerge = branchSummary.branches[branchName];
                                found = true;
                            }
                        });

                        // console.log(that.branchToMerge);
                        resolve(found);
                    });
                }
            });
        }).catch(e => {
            that.log("Error/Warning when finding current branch: ", e.message);
        });
    }

    async release() {
        var that = this;
        return new Promise(function (resolve, reject) {
            simpleGit()
                .add('./*')
                .commit('New version release')
                .push('origin', that.branchToMerge.name)
                .checkout('master', (err) => {
                    if (err) reject(new Error("Error checking out master branch"));
                })
                .mergeFromTo(that.branchToMerge.name, 'master', (err) => {
                    if (err) reject(new Error(`Error merging ${that.branchToMerge.name} to master.`));
                })
                .push('origin', 'master');
            resolve();
            console.log("Switched to branch 'master'");
        }).catch(e => {
            that.log("Error releasing new version: ", e.message);
        });
    }
};
