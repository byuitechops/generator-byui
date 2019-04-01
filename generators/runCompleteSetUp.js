const moment = require('moment');
const chalk = require('chalk');
/***************************************************
 *  runCompleteSetUp
 *  that function is a member function for the
 *  ByuiConfig Class.
 *  It gathers information and sets up configurations
 *  for all byui generators which inherit from the
 *  ByuiConfig Class.
 ***************************************************/
module.exports = async function runCompleteSetUp() {

  var that = this;
  var onMaster = await that.byuiGeneratorTools.onMasterCheck();
  var newestGeneratorVersion = await that.byuiGeneratorTools.getNewestGeneratorVersion();
  var installedGeneratorVersion = await that.byuiGeneratorTools.getInstalledGeneratorVersion();
  // that.log('newest: ', newestGeneratorVersion);
  // that.log('current: ', )
  //1. Collect Data
  that.configs = {
    onMaster: onMaster,
    directoryFiles: that.byuiGeneratorTools.getDirectoryFiles(),
    newestGeneratorVersion: newestGeneratorVersion,
    installedGeneratorVersion: installedGeneratorVersion
  };

  //that line is SO important.  If it is not in place, then a generator that composes with other
  //generators that all inherit from the ByuiConfig generator, that generator will cause the
  //set up to be run every time a composeWith generator is called, and in that case, we only want
  //the setup to run once.
  //Set up the byuiOptions object
  that.options.byuiOptions = {
    configs: that.configs,
    stackOfGeneratorsCalled: [],
    update: that.options.update,
    fillTemplateObject: {
      timeCreated: moment().format('YYYY MMMM DD, hh:mm A'),
      generatorVersion: that.generatorVersion,
    }
  };
  //2. Perform Checks and Report Findings
  if (that.configs.onMaster) {
    //Warn the user
    that.log(chalk.yellowBright("WARNING: YOU ARE ON MASTER BRANCH!!"));
  }
  if (that.configs.newestGeneratorVersion !== that.configs.installedGeneratorVersion) {
    //Give a message
  }

  //May add something here that checks a current project generator version against the generator version on the users account

}
