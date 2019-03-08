const questionTools = require('./questionTools.js');

var nameOfProjectQuestion = {
  name: 'projectName',
  type: 'input',
  message: questionTools.messagePadEnd('Project Name'),
  suffix: ':',
  validate: questionTools.noBlank,
};

//---------------  CODE SETUP QUESTIONS ----------------
var codeTemplateQuestion = {
  name: 'codeTemplate',
  type: 'list',
  message: questionTools.messagePadEnd('Choose your JavaScript Templates'),
  suffix: ':',
  choices: ['callback', 'promise', 'sync'],
  //Might add something here, so that this doesn't run when the update flag is used.
};
// ---------------------------------------------------------

var questionBank = {
  projectName: nameOfProjectQuestion,
  codeTemplate: codeTemplateQuestion
}

module.exports = questionBank;
