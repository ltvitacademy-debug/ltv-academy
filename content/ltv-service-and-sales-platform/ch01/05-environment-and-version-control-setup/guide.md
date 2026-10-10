# Lesson 5 — Environment and Version Control Setup

**Chapter 1 · Design · Lesson 5 of 25**

## What you'll learn

- Why this capstone develops in scratch orgs instead of directly in a shared sandbox
- How to set up a Salesforce DX project with the Salesforce CLI (`sf`) and Git
- The `sfdx-project.json` and scratch org definition file, and what each one controls
- The basic source-tracking workflow you'll use for every remaining lesson in this course

## Why not just develop directly in an org?

Jules's declarative baseline lives in a sandbox, and it would be technically possible to open Setup and Developer Console there and just start building. Real Salesforce development teams don't work that way once code enters the picture, for a concrete reason: a shared sandbox has no reliable record of *who* changed *what*, no way to try something risky and throw it away cleanly, and no gate that stops broken code from landing where the whole team depends on it. **Salesforce DX** is Salesforce's source-driven development model built to fix exactly that — your Apex, Flow metadata, and object definitions live as files in a Git repository, and a disposable **scratch org** is where you actually build and test before anything merges.

## Salesforce CLI: `sf`, not `sfdx`

The Salesforce CLI is the command-line tool that creates scratch orgs, pushes and pulls metadata, and runs Apex tests from the terminal. Its current command set is the `sf` commands (for example `sf org create scratch`, `sf project deploy start`) — the older `sfdx`-prefixed command style (`sfdx force:org:create`) is deprecated, no longer maintained, and being phased out in favor of `sf`. Every command in this capstone, starting here, uses the current `sf` syntax.

## Setting up the project

A Salesforce DX project is a folder with a specific structure Salesforce's tooling expects:

```
solstice-service-sales/
├── sfdx-project.json
├── config/
│   └── project-scratch-def.json
├── force-app/
│   └── main/
│       └── default/
│           ├── objects/
│           ├── classes/
│           ├── triggers/
│           ├── flows/
│           └── lwc/
└── .gitignore
```

`sfdx-project.json` declares the project's package directories and the Salesforce API version this project targets — this is the file that tells the CLI where `force-app` is and what metadata format to read and write. `config/project-scratch-def.json` is the **scratch org definition file**: it specifies which Salesforce edition and features (for example, which license types and which org preferences) a freshly created scratch org should have, so every developer on the team gets an identically configured disposable org instead of a hand-configured one.

## Creating a scratch org and pulling source

The basic loop you'll repeat through every remaining chapter:

```bash
# Authenticate the CLI against your Dev Hub (one time)
sf org login web --set-default-dev-hub --alias SolsticeDevHub

# Create a scratch org from the definition file
sf org create scratch --definition-file config/project-scratch-def.json \
  --alias solstice-scratch --set-default

# Push your local metadata into the scratch org
sf project deploy start --source-dir force-app

# Open the scratch org in a browser to look around
sf org open
```

Because a scratch org is disposable, **source of truth lives in your Git repository, not in the org.** If you build something declaratively in the scratch org's Setup UI (a new field, a Flow), you pull it back into your local files before it's considered "real":

```bash
sf project retrieve start --source-dir force-app
```

## Git: committing as you go

Every lesson from here forward ends with a commit. Initialize the repo once:

```bash
git init
git add sfdx-project.json config .gitignore force-app
git commit -m "Initial Salesforce DX project scaffold"
```

From Lesson 6 onward, each new piece of metadata — an object, a Flow, an Apex class — gets added and committed on its own, with a message describing what it does, exactly the history a real Salesforce team keeps so any change can be traced back to the lesson (or ticket) that introduced it.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce DX | Salesforce's source-driven development model: metadata as files in version control, built in disposable scratch orgs |
| Scratch org | A temporary, disposable Salesforce org created from a definition file for development and testing |
| `sfdx-project.json` | The project manifest declaring package directories and target API version |
| Scratch org definition file | The JSON file specifying a scratch org's edition, features, and settings |
| Salesforce CLI (`sf`) | The current command-line tool for creating orgs and deploying/retrieving metadata; successor to the deprecated `sfdx` command style |

## Lab

Create the Salesforce DX project folder structure shown above, write a `project-scratch-def.json` requesting a Developer edition scratch org, initialize Git, and make your first commit. Then run the four-command loop above against a free Dev Hub-enabled org to confirm you can create a scratch org and open it in a browser.

## Check yourself

- Why does this capstone build in scratch orgs instead of directly in a shared sandbox?
- What's the difference between `sfdx-project.json` and the scratch org definition file?
- What command pulls declarative changes made in the scratch org's UI back into your local project files?
