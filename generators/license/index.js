const ByuiConfig = require('../ByuiConfig.js');
const https = require('https');
const path = require('path');
module.exports = class License extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  async initializing() {
    await super.initializing();
  }

  prompting() {

  }

  async configuring() {

    //Run the update logic if the update flag is found
    if (this.options.byuiOptions.update) {
      this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.license);


      var that = this;
      var myObject = "";
      var options = {
        host: 'api.github.com',
        path: `/repos/byuitechops/${path.basename(this.contextRoot)}`,
        headers: {
          'User-Agent': 'generator-byui'
        }
      }
      this.yearGitHubRepoCreated = await new Promise(function (resolve, reject) {
        https.get(options, (res) => {
          res.on('data', (d) => {
            myObject += d;
          });
          res.on('end', function () {
            //Get the year from the github project
            resolve(JSON.parse(myObject).created_at.substring(0, 4));
          });
          res.on('error', (e) => reject(e));
        });
      }).catch(e => that.log(e.message));

    } else {
      //In this case we have a new project, so get the current year.
      this.yearGitHubRepoCreated = (new Date()).getFullYear();
    }
  }

  //Default functions are run here

  writing() {
    this.fs.copyTpl(
      this.templatePath(`MIT_LICENSE.ejs`),
      this.destinationPath(this.filenames.license), {
        yearGitHubRepoCreated: this.yearGitHubRepoCreated
      }
    );
  }


  conflicts() {


  }

  install() {


  }

  end() {


  }

};
