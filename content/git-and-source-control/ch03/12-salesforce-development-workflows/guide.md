# Lesson 12 — Salesforce Development Workflows

**Chapter 3 · Salesforce Workflows · Lesson 12 of 17**

## What you'll learn

- What Salesforce DX (SFDX) is and the problem it was built to solve
- The difference between the metadata API format and the newer source format
- What a scratch org is, and how it fits into a Git-based workflow
- The shape of a real retrieve → commit → deploy cycle

## From "the org is the source" to source-driven development

Lesson 1 introduced the core shift: instead of treating a Salesforce org as the authoritative copy of an application, source-driven development treats a **Git repository** as the source of truth, with orgs as deployment targets that get the repository's contents pushed to them. **Salesforce DX (SFDX)** is Salesforce's own tooling built specifically to support this model — a project structure, a CLI (the `sf` command), and a way of representing metadata as individual, readable text files instead of one large retrieved package.

## Metadata API format vs. source format

Salesforce metadata can be represented on disk in two different shapes:

- **Metadata API format** (the older style): one Apex class's metadata and its `-meta.xml` file might sit inside a larger, less granular folder structure, and object metadata tends to bundle many things about one object into a single large file.
- **Source format** (what Salesforce DX projects use): metadata is broken out into small, individually readable files — a custom field gets its own file inside the object's `fields/` folder, a profile's permissions are broken apart rather than living in one giant file, and the whole structure is deliberately designed to produce small, readable diffs and clean merges in Git.

```
force-app/main/default/
├── classes/
│   ├── AccountTriggerHandler.cls
│   └── AccountTriggerHandler.cls-meta.xml
├── objects/
│   └── Account/
│       └── fields/
│           └── Tier__c.field-meta.xml
└── triggers/
    └── AccountTrigger.trigger
```

This matters directly for everything in this chapter: Git diffs and merges work *far* better against small, one-concept-per-file source format than against large, multi-concept metadata API bundles — a change to one custom field shows up as a change to one small file, not as noise buried inside a much larger one.

## Scratch orgs

A **scratch org** is a temporary, disposable Salesforce org, fully source-tracked and created on demand from a definition file (`project-scratch-def.json`) committed to the repository itself. Scratch orgs are built to pair directly with a Git branch-based workflow: a developer creates a fresh scratch org for a feature branch, pushes the branch's metadata into it to test, and discards the org entirely once the branch is merged — no manual sandbox cleanup, no risk of leftover test data drifting between unrelated features. Because the scratch org's starting configuration is itself defined in a tracked file, two developers (or CI) can reliably create *the same kind* of org from scratch.

```bash
sf org create scratch --definition-file config/project-scratch-def.json --alias my-feature-org
sf project deploy start --target-org my-feature-org
```

## A real retrieve → commit → deploy cycle

Putting it together, a typical day working on a source-tracked Salesforce project looks like this:

1. **Create a branch** for the work (Lesson 4): `git switch -c feature-tier-field`
2. **Make the change** in a scratch org or sandbox — add a field, edit a flow, write an Apex class.
3. **Retrieve the change** into the local project folder: `sf project retrieve start --target-org my-feature-org`
4. **Review what actually changed**: `git status` and `git diff` show exactly which metadata files were touched — a good moment to catch an accidental, unrelated change pulled in alongside the intended one.
5. **Commit and push** the change, exactly as in Lessons 2 and 6.
6. **Open a PR**, let CI run a validation-only deploy against a target org, get it reviewed (Lessons 7-10).
7. **Merge**, and a deployment pipeline (often triggered by the merge itself) deploys the change forward to the next org in the release process.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce DX (SFDX) | Salesforce's tooling and project structure supporting source-driven, Git-based development |
| Source format | Metadata broken into small, individually readable files, designed for clean Git diffs |
| Metadata API format | The older, more bundled representation of Salesforce metadata |
| Scratch org | A temporary, disposable org created on demand from a tracked definition file |
| `sf project retrieve start` | Pulls metadata changes from an org into the local source-format project |
| `sf project deploy start` | Pushes local source-format metadata to a target org |

## Lab

Sketch out (in writing, no org required) the retrieve → commit → deploy cycle for a realistic small change: adding a new picklist value to an existing field. List each of the seven steps above as they'd apply to this specific change, including what you'd expect `git diff` to show after step 4 (which specific file, and roughly what inside it would change).

## Check yourself

Can you explain, specifically, why Salesforce DX's source format produces better Git diffs than the older metadata API format? Can you describe what a scratch org is and why its definition file being tracked in Git matters for consistency across a team?
