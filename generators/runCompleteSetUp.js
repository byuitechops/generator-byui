/***************************************************
 *  runCompleteSetUp
 *  This function is a member function for the
 *  ByuiConfig Class.
 *  It gathers information and sets up configurations
 *  for all byui generators which inherit from the
 *  ByuiConfig Class.
 ***************************************************/
module.exports = function runCompleteSetUp() {
  //1. Collect Data
  this.configs = {
    onMaster: this.byuiGeneratorTools.onMasterCheck(),
    directoryFiles: this.byuiGeneratorTools.getDirectoryFiles(),
    newestGeneratorVersion: this.byuiGeneratorTools.getNewestGeneratorVersion(),
    installedGeneratorVersion: this.byuiGeneratorTools.getInstalledGeneratorVersion()

  };

  //This line is SO important.  If it is not in place, then a generator that composes with other
  //generators that all inherit from the ByuiConfig generator, that generator will cause the
  //set up to be run every time a composeWith generator is called, and in that case, we only want
  //the setup to run once.
  //Set up the byuiOptions object
  this.options.byuiOptions = {
    configs: this.configs
  };

  //2. Perform Checks and Report Findings
  if (this.configs.onMaster) {
    //Warn the user
  }
  if (this.configs.newestGeneratorVersion !== this.configs.installedGeneratorVersion) {
    //Give a message
  }

  //May add something here that checks a current project generator version against the generator version on the users account

}
