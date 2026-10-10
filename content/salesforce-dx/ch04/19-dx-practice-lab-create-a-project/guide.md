# Lesson 19 — DX Practice Lab: Create a Project

**Chapter 4 · Practice · Lesson 19 of 22**

## What you'll learn

- How to assemble everything from Chapters 1-2 into one working project, start to finish
- The exact sequence of commands, in order, with no steps skipped
- What to check at each step before moving to the next
- What "ready for Lesson 20" looks like

## This lesson is the lab

Unlike earlier lessons, this one is almost entirely the walkthrough itself — a consolidated run-through of project creation using the commands you've already learned individually in Chapters 1 and 2. Treat the sequence below as a checklist to execute in order, not just something to read.

## Step 1: Confirm your tooling

```bash
sf version
sf org list
```

Confirm the CLI reports `@salesforce/cli/2.x` (Lesson 2) and that your Dev Hub shows up as the default Dev Hub in `sf org list` (Lesson 4). If either check fails, resolve it before continuing — everything downstream depends on both.

## Step 2: Generate the project

```bash
sf project generate --name dx-capstone
cd dx-capstone
```

Confirm the standard structure exists: `sfdx-project.json` at the root, `force-app/main/default/` with its metadata-type subfolders, and `config/` ready for a definition file (Lesson 7).

## Step 3: Review and adjust sfdx-project.json

Open the generated `sfdx-project.json` and confirm `packageDirectories` points at `force-app` with `"default": true`, and set `sourceApiVersion` to a current API version. Leave `namespace` empty for this project — you're not registering a namespace or building a package in this lab (Lesson 8).

## Step 4: Write a scratch org definition file

Create `config/project-scratch-def.json`:

```json
{
  "orgName": "DX Capstone",
  "edition": "Developer",
  "features": [],
  "settings": {
    "lightningExperienceSettings": {
      "enableS1DesktopEnabled": true
    }
  }
}
```

This matches the structure from Lesson 6 — keep it minimal for now; you can always add features or settings later as a project's needs grow.

## Step 5: Add one real piece of metadata

Before moving to Lesson 20's deploy lab, add something real to deploy. Create a simple Apex class under `force-app/main/default/classes/`, for example a class with one method that returns a greeting string, plus its accompanying `-meta.xml` file (Lesson 9's source-format pairing). This gives Lesson 20 an actual component to push into a scratch org, rather than an empty project.

## Step 6: Commit to version control

```bash
git init
git add .
git commit -m "Initial Salesforce DX project structure"
```

This is the step that actually makes this a source-driven project (Lesson 3) rather than just a folder of files — the commit is now the project's real starting point.

## Key terms

| Term | Meaning |
|---|---|
| `sf project generate` | Scaffolds the standard project structure this lab builds on |
| Minimal definition file | A scratch org definition file with only the properties you currently need |
| Source-format pairing | A content file (`.cls`) alongside its `-meta.xml` companion |

## Lab

Execute Steps 1 through 6 above, in order, either on your own machine with real CLI access or by writing out each file's exact contents by hand if you don't have an org available. At the end, you should have: a generated project, a reviewed `sfdx-project.json`, a scratch org definition file, one real Apex class, and a Git commit. Confirm each exists before moving to Lesson 20.

## Check yourself

Can you list, from memory, the six steps in order? Can you explain why Step 6 (committing to Git) is the step that actually makes this project "source-driven" rather than just a folder of generated files?
