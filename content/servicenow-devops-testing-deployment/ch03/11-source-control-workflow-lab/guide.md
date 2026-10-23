# Lesson 11 — Source Control Workflow Lab

**Chapter 3 · Source Control Integration · Lesson 11 of 26**

## What you'll learn

- How to walk a scoped application through a full connect-commit-review-merge cycle, end to end
- How a feature branch keeps one developer's in-progress work isolated from the rest of the team
- What a real pull request adds to a change that an Update Set alone never could
- How the approved result lands in a Test instance, ready for the ATF work Chapter 4 builds on

## The scenario

Course 6's capstone, the Equipment Checkout scoped application, is now maintained by a small team instead of a single developer. The team wants real code review before any change merges — not just an Update Set moving from Dev to Test, but an actual pull request, read and approved by a teammate, the same way any other software team would review a change. This lesson walks that workflow from end to end as a worked scenario — no screenshots, just the real sequence of steps.

## Step 1 — Connect the application to a repository

The team starts by doing exactly what Lesson 10 described: in Studio, the Equipment Checkout application record is linked to a new repository on GitHub, and the credentials needed to authenticate — a service account with push and pull access — are configured on the connection. From this point forward, the application's code has a real home outside the Dev instance alone.

## Step 2 — A developer builds a feature on a branch

A developer is assigned a real piece of work: adding a due-date reminder notification to the Equipment Checkout application. Rather than editing directly on the application's main line of code, they create a feature branch for this one piece of work — isolating it from whatever else the rest of the team might be changing in Dev at the same time. They build the notification inside Studio, in the Dev instance, exactly as Course 6 taught: a scheduled job, a notification record, the message template. When the feature is working, they push that work from the Dev instance, and it lands in the connected GitHub repository as real commits on that feature branch — not yet merged into the application's main line.

## Step 3 — Opening a pull request

With the feature branch pushed, the developer opens a pull request against the application's main branch: a real, explicit proposal to merge this specific set of changes, visible to the rest of the team. A teammate reviews it the same way they'd review a pull request on any other software project — reading the actual diff of what changed, leaving comments, asking a question about one line of the notification script, and only approving once satisfied the change is correct. This is the real capability Lesson 9 promised: a genuine review gate, with a visible diff and a conversation attached to it, sitting in front of the change before it ever reaches a shared codebase.

## Step 4 — Merging, and pulling into Test

Once the pull request is approved, it gets merged into the application's main branch in the repository — the due-date reminder feature is now officially part of the application's source of truth. From there, the change is pulled from the repository into the Test instance, updating the Equipment Checkout application there to match what was just approved and merged. The feature is now in Test, having arrived through a reviewed, documented path rather than an unreviewed Update Set move.

## Why this matters for Chapter 4

The due-date reminder feature now sitting in Test is exactly the kind of change Chapter 4's Automated Test Framework is built to verify automatically, every time it changes again. Source control didn't replace testing — it made the change trustworthy enough, and traceable enough, to be worth testing in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Feature branch | An isolated line of development for one specific change, kept separate from the main codebase until ready |
| Pull request | A proposed merge of a feature branch into the main branch, opened for team review |
| Main branch | The application's primary, shared line of code — what Test and Production are meant to reflect |
| Merge | Combining an approved feature branch's changes into the main branch |

## Check yourself

Walk through the whole scenario out loud, without looking: connect, branch, push, pull request, review, merge, pull into Test. At which step does a teammate actually get to read and comment on the change before it reaches the shared codebase?
