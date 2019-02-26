# Project Capture Document for Yeoman Project Document Generator
#### *Author: Ryan Gewondjan*

## Background
As an office, we have been working to continually improve our organization, so that we can be as effective and efficient as possible when meeting our stakeholders' needs. This project was born in an effort to automate the documentation process as well as to have a structured way to create a project shell when we first start a project. There is a need for a template structure for all projects. One that creates the project shell and perhaps also can be used throughout the project to generate various components of the project and integrating those components into the rest of the project. Thus we will be more organized and automated as an office.

In addition to going forward with new projects. There is a need to backfill existing projects with standardized documentation. Also if we significantly change the format of some of our documentation, it would be beneficial to have an automated way to backfill those projects that need the update.

-----

## Objectives
- Setup project with initial shell of documents and code templates.
- Update existing projects with new document formats.

-----

# Requirements

### Input Requirements

#### Source of Inputs

Inputs will come from the *developer* assigned to the project and from all existing project documents if any. If the project exists the entire repository will be needed to be cloned from github beforehand.

#### Definition of Inputs

Inputs:
- Any existing documents especially a package.json
- Developer assigned to the project.

---

### Output Requirements
#### Destination

This is a project shell for new projects and an updated project for existing projects. Documentation and project boilerplate code is to live in the local and remote github repository. The developer will need to push the changes to github to update the remote.

#### Definition of Outputs

- a LICENSE file
- a package.json file
- a README.md file
- All project life cycle documents
- Boilerplate code files
- A build structure (like gulp, a lightweight solution that will set up the project so the developer can start right away)

---

### Interface

The developer will enter information pertaining to the project into a CLI questionnaire.

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