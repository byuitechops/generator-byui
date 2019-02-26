var Generator = require("yeoman-generator");
var capture = require("../capture/index.js");
var yeoman = require('yeoman-environment');

class ExtensionTest extends Generator {
  constructor(args, opts) {
    super(args, opts);
    //Enter settings here
    this.test = "This is the test variable";
  }




}


module.exports = class extends ExtensionTest {

  constructor(args, opts) {
    super(args, opts);
    this.capture = capture;
    // this.env = yeoman.createEnv();
    // this.env.register(require.resolve('../components/index.js', 'byui-tech-ops:components'));
  }

  initializing() {
    this.composeWith(require.resolve('../components'), {
      extraVar: "extraVar"
    });



  }

  testMethod() {
    this.log("master generator coming right up");
    // this.env.run('byui-tech-ops:components');


  }

  end() {
    this.log("and we just ended" + this.test);


  }




};
