/***************************************************
 *  ByuiGeneratorTools Class
 *  This class is meant as a suite of tools
 *  that are helpful in the generator process for byui.
 ***************************************************/
module.exports = class ByuiGeneratorTools {

  constructor(context) {
    //Set the context to the context that was passed in (the 'this' that was passed in)
    this.context = context;
  }

  getDirectoryFiles() {

    //Searches the directory and returns an array of all files contained
    //in the current directory

    //return directorFiles;
  }

  getNewestGeneratorVersion() {
    //Makes api call for newest generator

    //return newestGenerator;
  }

  onMasterCheck() {
    //Check if we are on the master branch
    this.context.log("in master check method");
    return true; //or false
  }

  getInstalledGeneratorVersion() {
    //checks the developer's machine for the installed generator

  }





};
