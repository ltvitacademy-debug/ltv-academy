# Lesson 32 — Version-Controlling a dbt Project

**Chapter 7 · dbt + Git + CI/CD · Lesson 32 of 45**

## What you'll learn

- Why a dbt project needs nothing new from Git — it's just a folder of
  `.sql` and `.yml` files
- Which Git/GitHub course concepts map directly onto dbt: `init`,
  `add`, `commit`, branches, and pull requests
- The one dbt-specific piece: doing all of that from inside dbt
  Cloud's IDE instead of a terminal
- Why "every developer works on their own branch" matters even more
  in dbt than in most codebases

## A dbt project is just files

This is the entire idea of this lesson, stated once, directly: a dbt
project — every model, every `schema.yml`, every macro, the
`dbt_project.yml` config — is nothing but text files in a folder.
Nothing about dbt requires a special version-control system. Every
concept from the Git/GitHub/CI-CD course in this catalog — `git init`,
`git add`, `git commit`, branches, `git push`, pull requests, merge
conflicts — applies to a dbt project exactly the way it applies to any
other codebase, because a dbt project *is* just another codebase.

## What's actually different: where you run the commands

The only new thing dbt adds is a place to do all of this without
leaving the browser. dbt Cloud's Studio IDE has its own Git panel —
you already saw a glimpse of it in Lesson 1's screenshot of the file
explorer. Making a change to a model and committing it looks like
this:

![The dbt Cloud IDE's "Commit Changes" modal: a text box for the commit message and a black "Commit Changes" button, with a note that the commit will be signed with a GPG key.](/courses/dbt/ch07/32-version-controlling-a-dbt-project/commit-changes-modal.png)
*Functionally this is `git commit -m "<message>"` — same action, same underlying Git history, just triggered from a modal instead of a terminal command.*
Source: [dbt Docs — IDE User Interface](https://docs.getdbt.com/docs/cloud/dbt-cloud-ide/ide-user-interface)

Behind that modal, dbt Cloud is running real Git operations against a
real repository — either a repo you connect from GitHub/GitLab/Azure
DevOps, or a "managed repository" dbt Cloud hosts for you if you don't
have one yet. Either way, the result is a normal Git history you could
just as easily inspect from the command line.

## The concepts that map directly

| Git/GitHub course concept | In a dbt project |
|---|---|
| `git init` / cloning a repo | Every dbt Cloud project is backed by one Git repo from day one |
| `git add` + `git commit` | The IDE's file-change list + "Commit Changes" modal above |
| Branches | Every developer gets their own branch in dbt Cloud automatically when they start editing |
| Pull requests | Opened the same way — dbt Cloud can create the PR for you, or you do it in GitHub directly |
| Merge conflicts | Resolved exactly as covered in that course — dbt doesn't change how Git merges text |

## Why per-developer branches matter more here

In most codebases, working on your own branch is good hygiene. In a
dbt project, it's closer to a requirement: dbt Cloud's development
environment runs models against a schema scoped to *your* branch, so
two developers running `dbt build` at the same time never stomp on
each other's tables. That branch-per-developer default is what makes
it safe for a whole analytics team to develop against the same
warehouse simultaneously — a problem raw SQL scripts, without version
control, never solved cleanly.

## Key terms

| Term | Meaning |
|---|---|
| Managed repository | A Git repo dbt Cloud hosts for you, for projects that don't already have one on GitHub/GitLab/Azure DevOps |
| Commit | Same Git concept as always — a saved snapshot of changes, with a message, triggered here from the IDE's modal |
| Development branch | The branch dbt Cloud automatically gives each developer to isolate their in-progress work |

## Lab

1. In dbt Cloud (or dbt Core with your own Git remote), make a small,
   harmless change to a model — add a comment, rename a column alias.
2. Commit it using the IDE's Commit Changes modal (or `git commit` if
   you're on dbt Core), then open a pull request the same way you did
   in the Git/GitHub/CI-CD course.
3. Find your current branch name in the IDE and confirm it's not
   `main` — if it is, create a new branch first and repeat the change
   there instead.

## Check yourself

You're ready for Lesson 33 when you can explain why nothing about Git
itself changes for a dbt project — and name the one dbt-specific
convenience (the IDE's Git panel) that sits on top of it.
