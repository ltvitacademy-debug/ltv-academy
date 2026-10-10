# Lesson 18 — Version-Controlling Your Capstone

**Chapter 4 · Job Preparation · Lesson 18 of 26**

Lesson 17 told you what belongs in a portfolio repo — the SSIS package, the T-SQL DDL, the SSRS
report definition, screenshots, and a README. This lesson is where you actually build that repo,
using the Git fundamentals from How IT Teams Work, Lesson 5. If you haven't taken that lesson yet,
go do it first — this lesson assumes you already know what a repo, a commit, and a branch are.

## What you'll learn

- How to turn your local capstone folder into a real Git repository
- The exact sequence of commands that gets your files from your machine onto GitHub
- What belongs in this project's `.gitignore`, and why
- How to confirm, concretely, that your repo actually proves what your resume claims

## From local folder to GitHub repo

You've been building this capstone in a local folder this whole time — the SSIS package, your
SQL scripts, your README draft from Lesson 17. Turning that into the portfolio repo a reviewer can
actually open takes five steps:

```
cd work-order-bi-pipeline          # your project folder
git init                           # start tracking this folder with Git
git add .                          # stage everything you want in the repo
git commit -m "Initial commit: work order BI pipeline"
```

Then, after creating an empty repository on GitHub (no README or .gitignore added there — you're
bringing your own):

```
git remote add origin https://github.com/<your-username>/work-order-bi-pipeline.git
git branch -M main
git push -u origin main
```

From here on, every time you add something — a new screenshot, a README revision, a fix to the
SQL — it's a new commit: `git add .`, `git commit -m "..."`, `git push`. This is the exact
workflow from How IT Teams Work, Lesson 5, applied to a project that's actually yours.

## What goes in `.gitignore`

Not everything in your local folder belongs in the repo. A `.gitignore` file tells Git which
files to never track — for this project, that typically means:

- Local SSMS or Visual Studio settings files, which are specific to your machine
- Any connection string or credentials file, if you ever created one for local testing
- Large exported data files you used for testing, which don't belong in version history

Lesson 5 covered why this matters: once something is committed, it's recoverable from the repo's
history forever, even after a later commit "deletes" it. A `.gitignore` set up before your first
commit is what keeps that from ever becoming a problem.

## Confirming the repo actually proves your claims

A repo that exists isn't the same as a repo that works as evidence. Before you consider this done,
check it the way a reviewer would:

1. Open the repo in a browser, signed out of GitHub if you can — can a stranger read your
   `WorkOrderETL.dtsx` and SQL files directly, with no download required?
2. Does the README on the front page explain the business problem before it lists any files?
3. Are the SSRS and Power BI screenshots actually visible in the README, not just linked?
4. Does the commit history show more than one commit — a real "initial commit" plus at least one
   follow-up — so it reads as an actual project, not a single file dump?

If any of those is "no," that's a real gap to fix, not a detail to skip — this repo is what turns
"I'll walk you through my project" from a claim into something a reviewer can check themselves in
under two minutes, exactly as Lesson 17 described.

## Key terms

| Term | Meaning |
|---|---|
| `git init` | Starts tracking the current folder as a Git repository |
| `git remote add origin` | Points your local repo at a hosted copy — here, a GitHub repository |
| `git push -u origin main` | Sends your commits to GitHub and sets `main` as the branch you'll push to by default from now on |
| `.gitignore` | A file listing what Git should never track — local settings, credentials, large test exports |

## Lab

Turn your actual capstone folder into a GitHub repository using the exact command sequence above.
Write a `.gitignore` listing at least the three categories of file named in this lesson. Then run
through the four-point check in "Confirming the repo actually proves your claims" against your own
repo, and fix anything that fails before moving on — this is the version of your project a
reviewer, and your resume's GitHub Portfolio section, will actually point to.

## Check yourself

You're ready for Lesson 19 when you can list the five commands that take a local folder to a
pushed GitHub repository, in order, and explain what you'd put in a `.gitignore` for this project
and why.
