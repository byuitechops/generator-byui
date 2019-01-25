'use strict';
const Generator = require('yeoman-generator');
const proc = require('child_process');
const chalk = require('chalk');
const https = require('https');

module.exports = class ByuiTechOpsGenerator extends Generator {
  constructor(args, opts) {
    //TODO: Add functionality to not allow spaces, special characters or caps in the naming of a folder for new projects.
    //Execute the parent class constructor (Generator)
    super(args, opts);

    //Create optional flags
    //This does the set-up for a new project
    this.option('new'); //Can use the --new on the command line.
    //This removes helper/warning questions if the user is experienced (exp stands for experienced).
    this.option('exp'); //Can use the --exp on the command line.

    //This takes out the questions at the end which ask whether we should overwrite the file or not
    this.conflicter.force = true;

    //Get the list of parent projects from the parentprojects file.
    this.parentOptions = require('./templates/lists/parentprojects.js');

    //Set up functions from other files by adding these functions as class methods, we have access
    //to all the member variables.
    this._documentQuestions = require('./questions/documentQuestions.js');
    this._updatePackageJsonObject = require('./core functions/updatePackageJsonObject.js');
    this._updateAnswersObject = require('./core functions/updateAnswersObject.js');
    this._readInFile = require('./core functions/readInFile.js');
    this._runNpmInit = require('./core functions/runNpmInit.js');
    this._preQuestions = require('./questions/preQuestions.js');
    this._postQuestions = require('./questions/postQuestions.js');

    //Get the generator version number for tracking
    const generatorPackageJson = require('../../package.json');
    this.generatorVersion = generatorPackageJson.version;
  }

  async initializing() {

    this.log(chalk.yellowBright("\nWelcome to the BYUI-TECH-OPS project generator"));
    await this.prompt(this._preQuestions())
      .then(preQuestionResponses => {
        this.preQuestionResponses = preQuestionResponses;
      })
      .catch(e => {
        this.log("Error in pre questions: ", e.message);
      });

    //If the project is new, then we will have been asked the repositoryNameForNewProjectsQuestion (see preQuestions.js). 
    //We need this response in order to set the folder name for the new project.
    //Changing the contextRoot changes where we call commands from (like npm init).
    if (this.options.new) {
      this.contextRoot = this.contextRoot + `/${this.preQuestionResponses.repositoryNameForNewProjects}`;
    }
    //Setting the destination root (where documents are printed to), to either where the command was called from (for existing projects),
    //or to where the new folder has been created (for new projects).
    this.destinationRoot(this.contextRoot);

    //If the user has selected to not proceed at the Not-in-Git-Repo-Warning, then exit
    if (this.preQuestionResponses.proceedEvenThoughNotInGitRepo === false) {
      this.log(chalk.yellowBright("----- Aborting -----"));
      process.exit(0);
    }

    //Set the default license to be "MIT"
    proc.execSync(`npm config set init-license "MIT"`);

    try {
      var code = 1;
      do {
        this.log(chalk.yellowBright("\n---------- Running NPM INIT -----------"));
        code = await this._runNpmInit();
      } while (code === 1);
    } catch (e) {
      //If we are here, there was an error running NPM Init
      this.log(chalk.red("ERROR running npm init: " + e.message));
    }
    this.log("We get to package.json!");
    //Read in package.json
    this._readInFile("packageJson", "package.json");
    this.log("We get passed package.json!");

    //Read in README.md if one exists
    if (this.fs.exists('README.md')) {
      this._readInFile("readMe", "README.md");
    } else {
      this.readMe = "";
    }

    //Read in PROJECTINFO.md if one exists
    if (this.fs.exists('PROJECTINFO.md')) {
      this._readInFile("projectInfo", "PROJECTINFO.md");
    } else {
      this.projectInfo = "";
    }
  }

  async prompting() {
    //Let the user know we are starting
    this.log(chalk.yellowBright("\n--------- Begin Custom Questionaire ---------"));
    return this.prompt(this._documentQuestions())
      .then(answers => {
        this.answers = answers;
        return this.answers;
      })
      .catch(e => {
        this.log("Error when prompting for document questions: ", e.message);
      });
  }

  configuring() {
    //Update the answers object
    this._updateAnswersObject();

    //Update the package.json object
    this._updatePackageJsonObject();

  }

  async writing() {
    this.log(chalk.yellowBright("\n--------- Writing Files ---------"));

    //Write the package.json
    this.fs.writeJSON('package.json', this.packageJson);

    //Write PROJECTINFO.md
    if (this.projectInfo === "" || this.answers.appendProjectInfo === true) {
      this.fs.copyTpl(
        this.templatePath('PROJECTINFO.md'),
        this.destinationPath('PROJECTINFO.md'),
        this.answers
      );

      this.newProjectInfo = this.fs.read('PROJECTINFO.md');
      this.projectInfo = this.projectInfo + this.newProjectInfo;
      this.fs.write('PROJECTINFO.md', this.projectInfo);
    }

    //Write the README.md
    if (this.readMe === "" || this.answers.appendReadMe === true) {
      //Write new README.md file
      this.fs.copyTpl(
        this.templatePath(`ReadMe Templates/${this.answers.readMeTemplate}`),
        this.destinationPath('README.md'),
        this.answers
      );

      this.newReadMe = this.fs.read('README.md');
      this.readMe = this.readMe + this.newReadMe;
      this.fs.write('README.md', this.readMe);
    }

    //Only generate the following boilerplate code for new projects
    if (this.options.new) {
      //Write main.js file
      this.fs.copyTpl(
        this.templatePath(`jsTemplates/${this.answers.jsTemplate}/main.js`),
        this.destinationPath('main.js'),
        this.answers
      );

      //Write bin.js file
      this.fs.copyTpl(
        this.templatePath(`jsTemplates/${this.answers.jsTemplate}/bin.js`),
        this.destinationPath('bin.js'),
        this.answers
      );

      //Write test.js file
      this.fs.copyTpl(
        this.templatePath(`jsTemplates/${this.answers.jsTemplate}/test.js`),
        this.destinationPath('test.js'),
        this.answers
      );

    }

    var myObject = "";
    var that = this;
    return new Promise(function (resolve, reject) {
      var options = {
        host: 'api.github.com',
        path: '/repos/byuitechops/generator-byui-tech-ops',
        headers: {
          'User-Agent': 'generator-byui-tech-ops'
        }
      }
      https.get(options, (res) => {
        res.on('data', (d) => {
          myObject += d;
        });
        res.on('end', function () {
          var year = JSON.parse(myObject).created_at.substring(0, 4);
          //Write the LICENSE
          that.fs.copyTpl(
            that.templatePath('MIT_LICENSE'),
            that.destinationPath('LICENSE'), {
              yearGitHubRepoCreated: year,
            });
          resolve(year);
        });

      }).on('error', (e) => {
        reject(e);
      });

    }).catch(e => {
      that.log(e.message)
    });

  }

  conflicts() {
    //No need to code here yet.
  }

  install() {
    //Can install dependencies, but for now we are leaving this blank
    // this.installDependencies();
  }

  async end() {
    //Can perform any task here to happen at the end (any cleanup tasks can happen here)

    this.log(chalk.yellowBright("\n-----------  Begin Clean-up Process -----------"));
    this.weNeedATodoList = (this.answers.appendReadMe || this.answers.appendProjectInfo || this.answers.appendReadMe !== false);
    if (this.weNeedATodoList) {
      this.log("You have finished part 1 of the documentation process!\nPart 2 is manual and here is your TODO list:\n");
      this.answers.appendReadMe ? this.log("[ ] You have appended to README.md, clean-up duplicate information in README.md") : null;
      this.answers.appendProjectInfo ? this.log("[ ] You have appended to PROJECTINFO.md, clean-up duplicate information in PROJECTINFO.md") : null;
      //If the this.answers.appendReadMe is undefined or true, there will be comments in the README.md file that need to be resolved.
      this.answers.appendReadMe !== false ? this.log("[ ] Review the TODO markdown comments for README.md to complete the ReadMe File") : null;
      this.options.new && this.answers.repositoryName !== this.preQuestionResponses.repositoryNameForNewProjects ? this.log("[ ] Your folder name and repo name do not match. Rename the folder") : null;
      //Add a line return
      this.log("");

      //Rename the repo

      //proc.execSync(`ren ${this.newFolderName} ${this.answers.repositoryName}`);
      //proc.execSync(`cd ${this.answers.repositoryName}`);
      proc.execSync(`code .`);
      proc.execSync(`code README.md`);
      //Keep displaying the todo list until the user answers that the todo list was complete
      do {

        (this.postQuestionResponses && this.postQuestionResponses.todoListComplete !== true) ? this.log(chalk.bgRed("\nYou Must Complete the Todo List before proceeding!\n")): null;
        await this.prompt(this._postQuestions())
          .then(postQuestionResponses => {
            this.postQuestionResponses = postQuestionResponses;
          })
          .catch(e => {
            this.log("Error in post questions: ", e.message);
          });
      } while (!this.postQuestionResponses.todoListComplete);
    }

    //Display the ending message
    this.log(chalk.yellowBright(`\n --- Congratulations, you have successfully documented the \"${this.answers.repositoryName}\" repo! ---\n`));
    this.log(`As a final step, don't forget to run:\n\n${chalk.yellowBright("\tgit add .\n\tgit commit -m \"commit message\"\n\tgit pull\n\tgit push\n")}`);

    //IDEA for future projects.  Handle git push and pull for you.
  }

};
