var Generator = require("yeoman-generator");

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
  }

  testMethod() {
    this.log("project capture doc, coming right up");


  }

  end() {
    this.log("and we just ended");


  }




};
