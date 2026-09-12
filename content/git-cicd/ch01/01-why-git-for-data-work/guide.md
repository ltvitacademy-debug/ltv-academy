# Lesson 1 — Why Git Matters for Data Work

**Chapter 1 · Git Fundamentals for Data People · Lesson 1 of 25**

## What you'll learn

- Why this course exists — version control for people whose daily work
  is SQL, dbt, and notebooks, not software engineering
- The three-stage model every Git operation moves through
- What actually breaks without version control on a real data project
- What this course does and doesn't assume you already know

## Who this course is actually for

This course is not a generic "learn to code" software-engineering
class. It's for people whose daily work is SQL scripts, dbt models,
Jupyter notebooks, and data pipelines — work that looks nothing like a
typical software repository, but genuinely needs the same protection
version control gives every other kind of code. Every example from
here on grounds itself in a data project, not a web app.

## The three-stage model

Every Git operation moves a change through three stages:

![Diagram showing Git's three-stage model: a working directory (files on disk) moves into a staging area via 'git add', then into the repository (.git) via 'git commit'.](/courses/git-cicd/ch01/01-why-git-for-data-work/git-staging-area.svg)
*Working directory → staging area → repository. Every Git command you'll learn in this course operates on one of these three stages.*
Source: [Software Carpentry — Version Control with Git](https://swcarpentry.github.io/git-novice/)

- **Working directory** — the actual files on your disk, exactly as you're editing them right now
- **Staging area** — a holding zone where you deliberately choose which changes go into the *next* commit (not automatically everything you've touched)
- **Repository** — the permanent, saved history, built one commit at a time

This staging step is the part that surprises people coming from "save
the file" workflows: Git never assumes you want to save *everything*
you've changed. You choose, deliberately, what goes into each commit —
which turns out to matter a lot once Chapter 3 covers keeping a SQL
script's schema change separate from an unrelated formatting fix.

## What actually breaks without it

Concretely, on a real data project:

- **"Final_v2_ACTUALLY_final.sql"** — filename-based versioning, because there was no real alternative
- **A dashboard breaks in production**, and nobody can say what changed in the query that fed it, or when
- **Two analysts edit the same dbt model** the same afternoon, and one's changes silently overwrite the other's
- **A stakeholder asks "what did this number look like last quarter"** — for the *query*, not just the data, and there's no way to answer

Git solves all four of these directly: every change is a timestamped,
attributed, permanent snapshot you can compare, restore, or explain
later.

## What this course assumes

You don't need to have used Git before — Lesson 2 starts installing it
from scratch. What this course *does* assume is that you're already
comfortable with SQL, and ideally have touched a dbt project or a
Jupyter notebook, since Chapter 3 and the CI/CD chapters build directly
on that context rather than explaining what a query or a notebook is.

## Key terms

| Term | Meaning |
|---|---|
| Working directory | The actual files on disk, as you're currently editing them |
| Staging area | A holding zone for changes you've deliberately chosen to include in the next commit |
| Repository | The permanent, saved commit history |
| Commit | A saved, timestamped, attributed snapshot of staged changes |

## Lab

1. Think of one real incident from your own work (or imagine one) where "which version of this file is correct" was genuinely unclear. Write two sentences describing what happened.
2. Revisit those two sentences after Lesson 6 (Resolving Merge Conflicts) and note which specific Git feature would have prevented or fixed it.

## Check yourself

You're ready for Lesson 2 when you can explain, in your own words, the
difference between the working directory, the staging area, and the
repository — and name one concrete data-work problem Git actually
solves.
