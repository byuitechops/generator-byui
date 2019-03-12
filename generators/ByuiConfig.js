'use strict';
const Generator = require('yeoman-generator');
const ByuiGeneratorTools = require('./ByuiGeneratorTools.js');
const runCompleteSetUp = require('./runCompleteSetUp.js');
const path = require('path');

/***************************************************
 *  ByuiConfig Class
 *  This class is designed to be our version of the
 *  yeoman generator which all of our generators
 *  will inherit from. They will inherit OUR or BYUI's
 *  yeoman configuration.
 *  All of the configuration for this class happens in
 *  the constructor.
 ***************************************************/
module.exports = class ByuiConfig extends Generator {

  constructor(args, opts) {
    super(args, opts);

    //Set up the byuiOptions argument
    this.argument("byuiOptions", {
      type: String,
      required: false
    });

    //Set the update option
    this.option("update");

    //Get the generator version number for tracking
    const generatorPackageJson = require(path.join(__dirname, '..', 'package.json'));
    this.generatorVersion = generatorPackageJson.version;

    //Choose our settings:    
    //Force file overwrites
    this.conflicter.force = true;

    //Set all the member functions
    this.byuiGeneratorTools = new ByuiGeneratorTools(this);
    this._runCompleteSetUp = runCompleteSetUp;

    //Load question bank
    this.questions = require('./questionBank.js');

    //Make the filename object available all over
    this.filenames = require('./filenames.js');




  }

  async initializing() {
    //If the byuiOptions object does not exist,
    //then we'll want to run all the checks
    //We have this conditional, so that we do not run all the checks for every sub generator
    //run within a generator (using composeWith).
    if (!this.options.byuiOptions) {
      await this._runCompleteSetUp();
    }
  }


}
