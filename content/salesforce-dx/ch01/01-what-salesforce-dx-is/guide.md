# Lesson 1 — What Salesforce DX Is

**Chapter 1 · Salesforce DX Basics · Lesson 1 of 22**

## What you'll learn

- What Salesforce DX actually is: a development methodology, not just a CLI
- The problem it was built to solve with traditional org-based development
- The five pieces that make up the Salesforce DX toolchain
- How this course's four chapters map onto those pieces

## From org-based development to source-driven development

Before Salesforce DX existed, Salesforce development mostly happened directly inside an org. A developer or admin opened a sandbox, clicked through Setup or wrote Apex in the Developer Console, and when the work was ready, bundled it into a change set to push toward production. The org itself was the source of truth. There was no local file that fully described a Flow or a Permission Set — if you wanted to know what changed, you compared orgs to each other, or relied on whoever remembered making the change.

That model works for small teams and simple orgs, but it breaks down fast once multiple developers touch the same org, once releases need to be reviewed before they ship, or once a team wants the same discipline — code review, version history, automated tests, a rollback path — that software teams outside the Salesforce ecosystem have had for years. **Salesforce DX** (Developer Experience) is Salesforce's answer: a set of tools and a development model built around **source-driven development**, where a local, version-controlled set of files is the source of truth, and orgs are just places that source gets deployed to and synced from.

## The toolchain, piece by piece

Salesforce DX isn't one tool — it's several pieces that work together:

- **Salesforce CLI** (the `sf` command). The command-line tool that creates orgs, authenticates to them, and moves metadata back and forth between your local project and an org. This is the tool you'll run constantly throughout this course.
- **Scratch orgs.** Short-lived, disposable orgs created on demand from a **Dev Hub**, configured from a JSON definition file, and thrown away when you're done with them — instead of one shared sandbox everyone fights over.
- **A standard project structure.** A specific folder layout (`force-app/`, `sfdx-project.json`, `config/`) that every Salesforce DX project follows, so tooling, CI pipelines, and other developers can all find things in the same place.
- **The Metadata API, in source format.** The same metadata that defines your org's objects, Apex classes, Flows, and permissions, but broken into individual readable files instead of one opaque bundle — so a diff in Git actually tells you something.
- **Packaging.** A way to bundle metadata into installable, versioned units (packages) instead of deploying raw, unpackaged metadata everywhere — covered in depth in Chapter 3.

## How this course is organized

Chapter 1 (this chapter) covers the foundational pieces: installing the CLI, understanding source-driven development, setting up a Dev Hub, and creating scratch orgs. Chapter 2 goes deep on project structure and the day-to-day mechanics of retrieving and deploying metadata, including how VS Code's Salesforce extensions wrap the CLI. Chapter 3 covers packaging: unlocked packages, second-generation managed packages, versioning, namespaces, and the newer org shape and org snapshot features that speed up scratch org setup. Chapter 4 is hands-on practice and troubleshooting, where you'll actually build a project and deploy it.

None of this replaces knowing Apex, Flow, or the data model — it's the operational layer that sits underneath all of that, the same way Git and a build pipeline sit underneath an application developer's actual code.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce DX | Salesforce's source-driven development methodology and toolchain |
| Source-driven development | A model where local, version-controlled files are the source of truth, not the org |
| Org-based development | The older model where the org itself (via change sets) is the source of truth |
| Salesforce CLI (`sf`) | The command-line tool that drives Salesforce DX workflows |
| Scratch org | A disposable, short-lived org created from a Dev Hub for development and testing |

## Lab

Without installing anything yet, write out — in your own words, 4-6 sentences — the difference between how a bug fix would travel from a developer's machine to production under the old change-set model versus under Salesforce DX's source-driven model. Specifically name where the "source of truth" lives in each model, and what role version control (like Git) plays in each.

## Check yourself

Can you explain, to someone who has only used change sets, why "the org is the source of truth" versus "the local file system is the source of truth" is the central difference Salesforce DX changes? Can you name the five pieces of the Salesforce DX toolchain listed in this lesson without looking back at it?
