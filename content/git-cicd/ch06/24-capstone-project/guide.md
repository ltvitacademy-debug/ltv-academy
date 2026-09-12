# Lesson 24 — Capstone: A Data Project With a Real CI/CD Pipeline

**Chapter 6 · Capstone · Lesson 24 of 25**

## What you'll build

Everything from this course, applied to a project of your own — not
another walkthrough of `retail-orders-analytics`. This capstone has
one goal: prove you can set up real Git hygiene and a real CI/CD
pipeline from a blank repository, without a lesson walking you through
each step.

## The brief

Starting from a dbt project (your own, or a small one you build for
this purpose — even three or four models is enough), deliver:

1. **A real repository with proper Git hygiene** (Chapters 1-3)
   - A `.gitignore` covering `target/`, `dbt_packages/`, `logs/`,
     `.env`, and anything else your project generates
   - At least one feature built on its own branch, merged via a real
     pull request — not a direct push to `main`
   - A commit history that tells a real story: meaningful messages,
     no `"fix"` / `"stuff"` / `"asdf"`

2. **At least one real code review** (Chapter 2)
   - A pull request with at least one line comment and one suggestion,
     even if you're reviewing your own work — the mechanics matter
     more than having a second person available

3. **A working CI job** (Chapters 4-5)
   - A `.github/workflows/ci.yml` that runs `dbt build` (or your
     project's equivalent test command) on every pull request against
     `main`
   - At least one deliberately broken commit, opened as a PR, showing
     a real red X — proof the pipeline actually catches something,
     not just that it runs

4. **A working deploy job** (Chapter 5)
   - A second job, gated to only run on a push to `main`, using a
     separate `--target` (or equivalent) from the CI job
   - Real secrets configured in GitHub, referenced via `${{ secrets.*
     }}` — nothing sensitive committed to the repository

## What "done" looks like

A repository where a stranger could clone it, read the `.gitignore`
and the workflow file, and understand exactly how a change gets
proposed, tested, reviewed, and deployed — without you explaining
anything out loud. That's the actual bar: not "I did the steps," but
"the repository itself demonstrates the practice."

## A realistic order of operations

1. Set up the repository and `.gitignore` first, before writing any
   dbt models — it's much harder to retroactively clean history than
   to start clean.
2. Get `dbt build` working locally before wiring it into CI. CI should
   never be where you first discover a project doesn't run.
3. Add the CI workflow, and deliberately break something to confirm it
   actually catches the failure — a pipeline that's never failed once
   hasn't been proven to work yet.
4. Add the deploy job last, once CI is solid — deploying with a shaky
   CI job just means shipping broken changes faster.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project applying this course's full pipeline to work you set up yourself, not a guided walkthrough |
| Proof of failure | Deliberately breaking a test once, to confirm the pipeline actually catches problems |
| Done | The repository itself demonstrates the practice, without verbal explanation |

## Lab

This entire lesson *is* the lab. Work through the brief above against
a real (or realistic practice) dbt project, checking off each of the
four numbered sections as you complete it.

## Check yourself

You're ready for the wrap-up lesson when your repository satisfies
all four sections of the brief, and you've watched at least one CI run
fail on purpose and one deploy run succeed for real.
