# Project Capture Document for Yeoman Project Document Generator
#### *Author: Ryan Gewondjan*

## Background
As an office, we have been working to continually improve our organization, so that we can be as effective and efficient as possible when meeting our stakeholders' needs. This project was born in an effort to automate the documentation process as well as to have a structured way to create a project shell when we first start a project. There is a need for a template structure for all projects.

In addition to creating a new project, there was a need to adjust the documentation for existing projects, filling in blanks where documentation is lacking.

-----

## Objectives
- Create initial documentation
- Update existing documentation
- Create project shell (boilerplate code files needed to start coding)
- Make a system that sets up project to consistently follow our standards.
- Add script files that are needed for the project.

-----

# Requirements

### Input Requirements

#### Source of Inputs

Inputs will come from the *developer* assigned to the project and from an *existing package.json* if it exists. If the project exists the entire repository will be needed to be cloned from github before starting.

#### Definition of Inputs

Inputs:
- Existing package.json for the project get information from this
- Developer assigned to the project.

---

### Output Requirements
#### Destination

Documentation and project boilerplate code is to live in the local and remote github repository. The developer will need to push the changes to github to update the remote.

#### Definition of Outputs

- a LICENSE file
- a package.json file
- a README.md file
- a PROJECTINFO.md file (this will probably be taken over by the new files coming our way).
- Boilerplate code files (currently set to node files, but flexibility exists to change these to any language).

---

### Interface

The developer will enter information pertaining to the project into a CLI questionnaire.

OR --> Suggestion: taking the information for the project will be tedious to do over CLI, and would be incredible to do with a single web form.

A temporary server could be put up to say localhost:5000, and information could be collected via a webpage.


#### Type: CLI or Webpage

- Run `yo byui-tech-ops` to update an existing project
- Add the `--new` options flag to start a new project
- Add the `--exp` to remove extra instructions (if you have followed the process before and know what you are doing, there are some extra checks that are removed.)
- Questions asked:
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

-----


## Expectations

### Timeline

### Best Mode of Contact

### Next Meeting


### Action Items
\**Recap Meeting*\*
#### TechOps
#### Stakeholder

-----

#### *Approved By:* 
#### *Approval Date:*