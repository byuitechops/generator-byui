// console.log((new Date()).getFullYear());
const simpleGit = require('simple-git');

async function master() {
  await (async () => {
    console.log("in IFFE");
    await runCompleteSetUp();
    console.log("after IFFE");

  })();

  console.log("The next item");
}

async function runCompleteSetUp() {
  console.log("in run complete setup function");
  var answer = await onMasterCheck();
  console.log("after onMaster await");
  console.log(answer);
}

async function onMasterCheck() {
  //Check if we are on the master branch
  console.log("in master check");
  return await new Promise(function (resolve, reject) {
    simpleGit().branch(function (err, branchSummary) {
      if (err) {
        reject(err);
      }
      //Check local and remote
      let onMaster = branchSummary.branches.master.current || branchSummary.branches['remotes/origin/master'].current;
      console.log("in master check method", onMaster);
      resolve(onMaster);
    });
  }).catch(e => {
    console.log("Error when checking if we are on the master branch: ", e.message);
  });

}
master();

//Tried some other stuff:
// process.env.VISUAL = "C:/Users/jedimasterryan/AppData/Local/Programs/Microsoft\ VS\ Code/Code.exe";

// console.log(`Editor is ${process.env.VISUAL}`);

// var npmInit = proc.spawn('npm init', {
//   stdio: [null, null, 'inherit'],
//   shell: true
// });

// process.stdin.pipe(npmInit.stdin);
// npmInit.stdout.on('data', function (data) {
//   console.log(data.toString());

// });

// var keywordsQuestion = {
//   name: 'keywords',
//   type: 'input',
//   message: 'List keywords to add separated by commas',
//   suffix: ':',
//   // TODO: fix the keywords filter.
//   // This filter gives an error.
//   filter: (input, answerHash) => {
//     var array = input.split(',');
//     return "Hello World";
//   }
// };

// var questions = [keywordsQuestion];

// test.prompt(questions).then(console.log);



//console.log(npmInit.stdout.toString());
// npmInit.on('close', function (code, signal) {
//   console.log("close", code);

// });

// npmInit.on('exit', function (code, signal) {
//   console.log("exit", code);

// });

// npmInit.on('message', function () {
//   console.log("message", code);
// });

// npmInit.on('error', function () {
//   console.log("error", code);
// });

//TODO List:

//ADD commands for update, or new
//Read this: https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a
//Add a function that first checks the package Json for the defaults then implements our own default in the cli prompt.

//Lessons learned:

//it is so much better to run npm init on a real repository, so that the bugs, readme and git repo links get filled out.
