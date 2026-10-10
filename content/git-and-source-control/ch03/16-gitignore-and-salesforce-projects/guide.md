# Lesson 16 — Gitignore and Salesforce Projects

**Chapter 3 · Salesforce Workflows · Lesson 16 of 17**

## What you'll learn

- What `.gitignore` does and the pattern syntax it uses
- What a real Salesforce DX project's `.gitignore` needs to exclude, and why
- What `.forceignore` does, how it differs from `.gitignore`, and why a project needs both
- The risk of committing something a `.gitignore` entry was supposed to keep out

## What .gitignore does

A `.gitignore` file lists patterns describing files and folders that Git should never track, even if they exist in the working directory. It doesn't delete anything or hide files from your editor — it just tells `git status` and `git add .` to skip anything matching a listed pattern, so junk never accidentally gets staged and committed in the first place.

```
# .gitignore syntax basics
.sfdx/              # ignore this entire folder
*.log                # ignore every file ending in .log, anywhere
node_modules/
!important.log       # an exception: track this one file even though *.log matches it
```

## What a Salesforce DX project actually needs to ignore

A real `sf`-generated project (`sf project generate`) ships with a sensible starting `.gitignore`, but it's worth understanding *why* each category of entry belongs there:

```
# Salesforce CLI / local state
.sfdx/
.sf/

# Local Salesforce preferences and logs
*.log

# Scratch org / local config that shouldn't be shared
config/project-scratch-def.json    # sometimes excluded, sometimes intentionally tracked — team decision
.localdevserver/

# Standard editor/OS noise, not Salesforce-specific
.vscode/
.DS_Store
node_modules/
```

The `.sfdx/` and `.sf/` folders hold local CLI state — things like your authenticated org connections and locally cached CLI data — that are specific to *your* machine and genuinely meaningless, or actively wrong, on anyone else's. Committing `.sfdx/` doesn't just add clutter; in the worst case it risks a teammate accidentally picking up stale, machine-specific org configuration that silently doesn't match their own setup. `node_modules/` is excluded for a different, much more universal reason: it's regenerable from `package.json` by anyone who runs `npm install`, and committing it would bloat the repository with files nobody should ever hand-edit anyway.

## .forceignore: the Salesforce-specific counterpart

`.gitignore` controls what Git tracks. `.forceignore` is a separate file, living at the project root, that controls something different: which metadata the `sf` CLI itself excludes when *retrieving from* or *deploying to* an org — regardless of whether that metadata is tracked in Git at all. Its syntax deliberately mirrors `.gitignore`'s patterns, which makes it easy to reason about once you know one.

```
# .forceignore
**/profiles/Admin.profile-meta.xml
**/staticresources/vendorLibrary/**
```

A common use case: a team wants a particular Profile to never be overwritten by an automated deploy (because it's managed by hand in each org for environment-specific reasons), so it's listed in `.forceignore` — the file still lives in Git and is still tracked normally, it's just skipped specifically during `sf project retrieve start` / `sf project deploy start` operations. `.gitignore` and `.forceignore` solve two genuinely different problems: one is about what Git versions, the other is about what the Salesforce CLI moves between your project and an org.

## The risk of a late .gitignore

A `.gitignore` entry only prevents files from being staged *going forward* — if a file was already committed before the ignore rule was added, Git keeps tracking it regardless of what `.gitignore` now says. A common real-world mistake: a developer commits `.sfdx/` early in a project, adds `.gitignore` later, and is confused when `.sfdx/` keeps showing up in every commit anyway. The fix requires explicitly untracking the already-committed path:

```bash
git rm -r --cached .sfdx/
git commit -m "Stop tracking .sfdx/ local CLI state"
```

`--cached` removes it from Git's tracking without deleting the actual folder from disk — exactly what you want, since the folder still needs to exist locally for the CLI to work.

## Key terms

| Term | Meaning |
|---|---|
| `.gitignore` | Lists patterns for files/folders Git should never track |
| `.forceignore` | Lists metadata the `sf` CLI excludes from retrieve/deploy operations, independent of Git |
| `.sfdx/` / `.sf/` | Local CLI state folders, machine-specific, that should never be committed |
| `git rm -r --cached` | Untracks an already-committed path from Git without deleting it from disk |

## Lab

A teammate committed `.sfdx/` to a shared repository three weeks ago, before anyone added a `.gitignore`. Write out, in order, the exact commands you'd run to: add a `.gitignore` entry for `.sfdx/`, stop tracking the already-committed folder without deleting it locally, and commit the fix. Separately, decide whether a Profile that's manually customized per-org belongs in `.gitignore` or `.forceignore`, and explain your reasoning.

## Check yourself

Can you explain the specific difference between what `.gitignore` controls and what `.forceignore` controls? Why doesn't adding a `.gitignore` entry automatically remove a file that was already committed before the entry existed?
