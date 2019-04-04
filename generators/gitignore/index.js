const ByuiConfig = require('../ByuiConfig.js');

module.exports = class GitIgnore extends ByuiConfig {
    constructor(args, opts) {
        super(args, opts);
    }

    async initializing() {
        await super.initializing();
    }

    async prompting() {
        // if the user knows what files need to be included in .gitignore
    }

    configuring() {
        //Run the update logic if the update flag is found
        if (this.options.byuiOptions.update) {
            this.byuiGeneratorTools.appendOldToCurrentFile(this.filenames.gitIgnore);
        }
    }

    // Default functions are run here

    writing() {
        this.fs.copyTpl(
            this.templatePath('gitignore.ejs'),
            this.destinationPath(this.filenames.gitIgnore),
            {
                // This is the object passed into 'gitignore.ejs'
                // It can be filled with whatever values you want to be interpreted there
            }
        )
    }
};