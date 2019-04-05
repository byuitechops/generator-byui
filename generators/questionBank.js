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

var authorQuestion = {
  name: 'author',
  type: 'input',
  message: questionTools.messagePadEnd('Author Name'),
  suffix: ':',
  validate: questionTools.noBlank,
};

var stakeholdersQuestion = {
  name: 'stakeholders',
  type: 'input',
  message: questionTools.messagePadEnd('Project Stakeholders'),
  suffix: ':',
  validate: questionTools.noBlank,
};

// ---------- RELEASE/VERSION QUESTION ----------
var branchQuestion = {
  name: 'branch',
  type: 'list',
  message: questionTools.messagePadEnd('What branch is being merged'),
  suffix: ':'
};
// ----------------------------------------------


var questionBank = {
  projectName: nameOfProjectQuestion,
  codeTemplate: codeTemplateQuestion,
  author: authorQuestion,
  stakeholders: stakeholdersQuestion,
  branch: branchQuestion,

}

module.exports = questionBank;
