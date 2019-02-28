var Generator = require("yeoman-generator");

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    if (this.options.extraVar) {
      this.options.extraVar = "added later";
    }


  }

  testMethod() {
    this.log("key components coming right up");
    this.log(this.options.extraVar);

  }

  end() {
    this.log("and we just ended");
  }




};
