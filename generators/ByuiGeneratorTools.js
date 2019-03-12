const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const proc = require('child_process');
const simpleGit = require('simple-git');
/***************************************************
 *  ByuiGeneratorTools Class
 *  This class is meant as a suite of tools
 *  that are helpful in the generator process for byui.
 ***************************************************/
module.exports = class ByuiGeneratorTools {

  constructor(context) {
    //Set the context to the context that was passed in (the 'this' that was passed in)
    this.context = context;
  }

  getDirectoryFiles() {

    //Searches the directory and returns an array of all files contained
    //in the current directory

    //return directorFiles;
  }

  getNewestGeneratorVersion() {
    //Makes api call for newest generator

    //return newestGenerator;
  }

  async onMasterCheck() {
    //Check if we are on the master branch
    var that = this.context;
    return new Promise(function (resolve, reject) {
      simpleGit().checkIsRepo(function (err, response) {
        if (err) reject(err);
        //If we are not in a git repository, go ahead and error out.
        if (!response) {
          reject(new Error("The current directory is not a git repository"));
        } else {
          simpleGit().branch(function (err, branchSummary) {
            if (err) reject(err);
            //If the branches object is empty, set onMaster to false. Otherwise check to see if either the remote or local branch is master.
            let onMaster = (branchSummary.branches === {}) ? (branchSummary.branches.master.current || branchSummary.branches['remotes/origin/master'].current) : false;
            resolve(onMaster);
          });
        }
      });
    }).catch(e => {
      that.log("Error/Warning when checking if we are on the master branch: ", e.message);
    });
  }

  getInstalledGeneratorVersion() {
    //checks the developer's machine for the installed generator

  }


  async appendOldToCurrentFile(filename) {
    //Rename current filename to same name plus 'OLD' appended
    var that = this.context;
    var oldPath = path.join(that.contextRoot, filename);
    var newPath = path.join(that.contextRoot, "OLD_" + filename);

    if (fs.existsSync(oldPath)) {
      await new Promise(function (resolve, reject) {
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }).catch(e => that.log("Error when prepending 'OLD' to existing file: " + e.message));

    }

  }


  audit() {
    //Check all the files, and report what files are needed and which ones we already have.

  }





};
