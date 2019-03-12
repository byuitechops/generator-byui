const ByuiConfig = require('../ByuiConfig.js');
const proc = require('child_process');
const chalk = require('chalk');

module.exports = class PackageJson extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

  }

  //Helper functions
  _runNpmInit() {
    return new Promise(function (success, fail) {
      var npmInit = proc.spawn('npm init', {
        stdio: ['inherit', null, 'inherit'],
        shell: true
      });

      npmInit.stdout.on('data', function (data) {
        process.stdout.write(data.toString());
      });

      npmInit.on('exit', function (code, signal) {
        success(code);
      });

      npmInit.on('error', fail);

    });
  }

  async initializing() {
    await super.initializing();
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

  }

  prompting() {

  }

  configuring() {
    //Run the update logic if the update flag is found

  }

  //Default functions are run here

  writing() {


  }

  conflicts() {


  }

  install() {


  }

  end() {


  }

};
