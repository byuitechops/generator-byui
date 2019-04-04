# Current:

-  New (Run when adding `--new` flag (however I suggest a different architecture going forward, I feel as if new should be the default or preferably separate new and update into two separate generators.))
    INITIALIZING:
    - Prompt for Name of project (using enquirer tools, we only allow characters allowed in a repository name).
    - Create a folder with that name
    - Make the folder the destination of all files to be written
    - Run NPM INIT
    - Read in package.json created into a packageJson object
    - Check for README.md and PROJECTINFO.md (since we are in an empty folder, these should not exist) (This type of logic makes me uncomfortable for maintainability)
    PROMPT:
    - Run custom questionnaire (using enquirer)
        - ReadMe Check. Then 'A README.md file exists would you like to append?'
        - PROJECTINFO.md Check. Then 'A PROJECTINFO.md file exists would you like to append?
        - Verify Author. (Gotten from the existing package.json or NPM INIT)
        - Verify Project Description (Gotten from the existing package.json or NPM INIT)
        - Project Purpose.
        - Project Stakeholders.
        - Size of project select. (Mini, small, medium, large).
        - Project Requirements
        - What type of install instructions would you like in your readMe (to select the appropriate template).
        - Is this project (repo) part of a bigger project (does it have a parent)?
        - If so who is the parent? (select from a list)
        - If the parent is not on the list, please enter the parent.
        - Choose your javascript templates (sync, callback or promise).
    - Put all these answers in the 'answers' object
    CONFIGURING:
    - Get all information needed before writing and add this to my answers object (things we didnt get in the prompt such as DATE, etc.)
    - Merge the existing packageJson object with the BYUI keys we wish to add using Object.Assign.
    WRITING:
    - Write all files (using templates) (the LICENSE file is created with the current DATE)
    END:
    -   Some random logic that grabs a checklist of what still needs to be done manually.


- Update (Run as default version):
    - Will update this when I come in next (is similar to the new process with some differences including an API call to github to grab the year created for the LICENSE and some questions are left out and the default value for the questions is provided.) 


# Future (For Sure):

- New:
    - Prompt the following
        - Name of Projects
        - Which Code Template Package would you like (Callbacks, Sync, Promises, etc.)
    - Run NPM INIT
    - Include generator version from generator package.json into the project package.json
    - In project document templates add a comment that includes the link to the how-to files in case a greater understanding is needed.
    - Add the following documents:
        - All documents corresponding with project life cycle (e.g. project capture, preliminary design)
        - LICENSE
        - package.json (created with NPM Init)
        - README - The template will contain html comments which will act as prompts for the develop, so he/she knows how to update the readme!
        - boilerplate code based on the template chosen.
- Update:
    - Run NPM Init
    - If a ReadMe Exists:
        - make the existing readme into READMEOLD and then create the new README.
    - If a ReadMe does not exist:
        - Add it
    - List warnings such as "a readme file exists and a readmeOld file was created" which are displayed at the end of run time.
    

# Future (Ideas):

- New and Update:
    - Prompt:
        - Would you like to add project files (e.g. Project Capture, Preliminary Design).
    - Internal check: Are you running the newest generator? (When running the generator, the generator will auto check to make sure that the current generator installed on your machine is in sync with the most up to date generator available (api call).)
    - If you are on master branch, warn the user.
    - All project steps (e.g. Project Capture, Preliminary Design) be their own subgenerator.
    

- New:
    - It may be that each coding template package corresponds to a different subgenerator.

- Update:
    - Internal check: Do the files in this project have the generator version tag that matches up with the version of the generator on your machine.

