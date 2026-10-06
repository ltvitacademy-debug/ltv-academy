# Lesson 21 — Capstone: A Project With a Real GitHub Workflow

**Chapter 5 · Capstone · Lesson 21 of 22**

## What you'll build

Everything from this course, applied to one real repository of your
own — not another walkthrough of a lesson example. This capstone has
one goal: prove you can run a real project through a real GitHub
workflow, start to finish, without a lesson walking you through each
step.

## The brief

Starting from any real (or realistic practice) code project you can
work on — a small app, a script collection, a personal tool, anything
with actual logic and at least a handful of files — deliver one
repository that includes all of the following:

1. **Real history and branches** (Chapters 1-2)
   - A commit history with meaningful, individually reviewable commits
     — not one giant "initial commit" dumping the whole project at
     once
   - At least one feature built on its own branch, merged back via a
     pull request rather than committed directly to `main`
   - At least one deliberate merge conflict, created and actually
     resolved (not avoided by rewriting history around it)

2. **A real pull request, reviewed** (Chapter 2)
   - A pull request with a real description explaining what changed
     and why
   - At least one inline review comment on a specific line, addressed
     with a follow-up commit — not just an approval with no comments
     at all

3. **A deliberate branching choice** (Chapter 3)
   - A short written note (in the README or a `NOTES.md`) stating
     whether this project uses Git Flow or trunk-based development,
     and why that fits a project of this size
   - A real tag marking a release point (`v1.0.0` or similar),
     annotated with a message

4. **A `.gitignore` that actually matches the project** (Chapter 3)
   - Dependencies, build output, and editor/OS noise excluded from day
     one — not added after something was already committed by mistake
   - If the project ever touched real credentials, confirm none of
     them are anywhere in the commit history, not just the current
     `.gitignore`

5. **A real CI/CD workflow** (Chapter 4)
   - A `.github/workflows/` file that runs your project's actual test
     suite (or a meaningful validation step, if the project genuinely
     has no tests yet) on every push and pull request
   - A separate job, gated by `github.event_name` and `github.ref`,
     that only runs on a real merge to `main` — even if its "deploy"
     step is something simple like building an artifact or printing a
     deployment summary

## What "done" looks like

A repository where a stranger could open the Actions tab, see real
runs with real pass/fail history, open the pull requests, and
understand exactly how this project is built, reviewed, and shipped —
without you explaining anything out loud. The commit graph and the
Actions tab should tell the same story the README does.

## A realistic order of operations

1. Get the project itself working locally first — don't start wiring
   up CI around code that doesn't run yet.
2. Set up `.gitignore` and your branching note before your second
   commit, not your fiftieth.
3. Do the feature-branch-plus-PR cycle for real, including the
   deliberate merge conflict, before adding any automation.
4. Add the CI workflow once there's a real test (or validation step)
   for it to run — automating nothing is a quick way to end up with a
   workflow that always passes vacuously.
5. Tag a release once the workflow is green on `main`.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project applying this course's full toolkit to a repository of your own, not a guided walkthrough |
| Done | The repository's history, PRs, and Actions tab demonstrate the practice, visible without verbal explanation |
| Vacuous pass | A CI check that always succeeds because it isn't actually validating anything meaningful |

## Lab

This entire lesson *is* the lab. Work through the brief above against
a real (or realistic practice) project, checking off each of the five
numbered sections as you complete it.

## Check yourself

You're ready for the wrap-up lesson when your repository satisfies
all five sections of the brief, and you've watched your own CI
workflow pass on a pull request and your deploy job correctly fire
only after a real merge to `main`.
