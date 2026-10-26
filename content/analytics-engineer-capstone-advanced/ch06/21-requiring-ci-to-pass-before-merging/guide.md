# Lesson 21 — Requiring CI to Pass Before Merging

**Chapter 6 · CI/CD for the dbt Project · Lesson 21 of 26**

## What you'll learn

- Why a passing CI workflow isn't a real gate until GitHub is
  configured to actually require it
- The real GitHub branch protection setting that turns "CI usually
  runs" into "CI must pass"
- How this one setting is what makes Chapter 4's tests matter in
  practice, not just in theory
- What a blocked pull request actually looks like to a developer

## A workflow that runs isn't the same as a workflow that's required

Lesson 20 built a real `ci.yml` that runs `dbt build` on every pull
request. On its own, that workflow running — even failing — doesn't
stop anything. Without one more step, a developer can still click
**Merge** on a pull request showing a red X, and GitHub will let them.
The workflow *informs*; it doesn't yet *block*.

## The real setting: a required status check

In the repository's **Settings → Branches**, adding a branch
protection rule for `main` with **"Require status checks to pass
before merging"** — and selecting this workflow's `build-and-test` job
specifically — is what turns the CI workflow from a report into a
gate. Once this is set:

- The **Merge** button is disabled on any pull request where
  `build-and-test` hasn't finished and passed.
- A pull request with a red X literally cannot be merged through
  GitHub's UI — not "shouldn't," *cannot*, until it's green.
- This applies to every contributor, including repository admins,
  unless the rule is explicitly configured to allow an override (not
  recommended for this platform).

## Why this is the real governance gate

Chapter 4 built tests that stop a `dbt build` from building on top of
bad data. Lesson 19 explained why that only matters on a shared
project if it runs automatically, not by habit. This lesson is the
last link: a required status check is what makes "automatically"
actually true. Without it, a developer whose `dbt build` fails locally
could still open a pull request, see CI fail, and merge anyway — the
tests would have run, and still changed nothing. With it, that's
structurally impossible through the normal GitHub merge flow.

## What a blocked pull request looks like

A developer who pushes a change that fails `non_negative` on
`orders.amount` sees, directly on their pull request: a red X next to
`build-and-test`, a disabled **Merge pull request** button with
GitHub's own message that required checks haven't passed, and a link
straight into the failing run's log — the same log Lesson 19 described,
showing exactly which test failed and on which model. Fixing it and
pushing a new commit re-triggers the workflow automatically; the
button re-enables the moment it goes green.

## This is what "governed" means, concretely

Lesson 1 asked for a platform where "a bad change ships straight to
the dashboard" stops happening. This lesson is the literal mechanism
that makes that true: not a policy written in a wiki asking people to
be careful, but a GitHub setting that makes merging a failing change
impossible through the normal workflow. Chapter 7's incident (Lessons
23-24) shows exactly this gate catching a real mistake before it ever
reaches `PROD`.

## Key terms

| Term | Meaning |
|---|---|
| Branch protection rule | A GitHub setting on a branch (here, `main`) restricting how it can be changed |
| Required status check | A specific workflow job that must pass before a PR's merge button is enabled |
| Blocked merge | A pull request that cannot be merged through GitHub's UI because a required check hasn't passed |

## Lab

1. In a real repository, add a branch protection rule for `main`
   requiring the `build-and-test` status check.
2. Open a pull request with a deliberately failing test and confirm
   the **Merge** button is disabled, with GitHub's own explanation
   visible.
3. Fix the failure, push a new commit, and confirm the check re-runs
   and the merge button re-enables once it passes.

## Check yourself

You're ready for Chapter 7 when you can explain the exact difference
between a CI workflow that runs and a CI workflow that's required, and
you've seen a blocked merge button yourself.
