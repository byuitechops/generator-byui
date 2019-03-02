const ByuiConfig = require('../ByuiConfig.js');

module.exports = class PackageJson extends ByuiConfig {
  constructor(args, opts) {
    super(args, opts);

    //Load the configs from the parent class into the byuiOptions object
    this.needToPrompt = false;
    if (!this.byuiOptions) {
      this.byuiOptions = this.configs;
      this.needToPrompt = true;
    }
  }

  initializing() {
    this.log("packageJson reporting in");

  }


};
