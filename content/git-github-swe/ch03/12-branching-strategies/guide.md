# Lesson 12 — Branching Strategies: Git Flow & Trunk-Based

**Chapter 3 · Collaborative Workflows · Lesson 12 of 22**

## What you'll learn

- Why teams need an agreed-upon branching strategy, not just ad-hoc branches
- Git Flow: the long-lived-branch model built for scheduled releases
- Trunk-based development: the short-lived-branch model built for continuous delivery
- How to tell which one a team you join is actually using, and why

## Why a strategy at all

Branching itself is cheap — any one developer can create and merge
branches without a plan. The problem shows up at team scale: if five
engineers each invent their own branch names, lifetimes, and merge
habits, nobody can predict where a given piece of work lives or when
it's safe to release. A branching **strategy** is just a shared,
written-down answer to three questions: where does new work start,
how long does a branch live, and what has to be true before it merges.

## Git Flow

Git Flow, popularized by Vincent Driessen in 2010, is a strategy built
for software with scheduled, versioned releases — desktop apps,
installed software, anything where "ship whenever" isn't an option.
It uses several long-lived and short-lived branch types, each with a
specific job:

```
main         # always reflects the latest released, production code
develop      # integration branch — the next release in progress
feature/*    # one branch per feature, branched from develop
release/*    # a release candidate, branched from develop, bug-fixes only
hotfix/*     # an urgent production fix, branched from main
```

The flow: a feature branches from `develop`, gets merged back into
`develop` when done. When it's time to ship, a `release/*` branch
forks from `develop` — only bug fixes land there, no new features.
Once it's stable, it merges into both `main` (tagged as the release —
Lesson 15 covers tags) and back into `develop`. A `hotfix/*` branch
skips the queue entirely: it forks from `main`, fixes the urgent bug,
and merges into both `main` and `develop` immediately.

```
$ git checkout develop
$ git checkout -b feature/user-avatars
# ...work, commit...
$ git checkout develop
$ git merge feature/user-avatars

$ git checkout -b release/2.4.0 develop
# ...bug fixes only...
$ git checkout main
$ git merge release/2.4.0
$ git tag v2.4.0
$ git checkout develop
$ git merge release/2.4.0
```

This gives a team a lot of structure and a very legible history, at
the cost of real process overhead — more branches to track, more
merge points, and a `develop`/`main` split that can drift out of sync
if a hotfix is forgotten on one side.

## Trunk-based development

Trunk-based development takes the opposite bet: instead of managing
that overhead, avoid it. There's one long-lived branch — `main` (the
"trunk") — and everyone's feature branches are short-lived, often
merging back within a day or two, sometimes within hours.

```
$ git checkout main
$ git pull
$ git checkout -b add-retry-logic
# ...small, focused change...
$ git push origin add-retry-logic
# open a PR, get it reviewed, merge same-day
$ git checkout main
$ git pull
$ git branch -d add-retry-logic
```

Because branches are short-lived, merge conflicts stay small — nobody
is reconciling three weeks of divergence. The catch: if `main` is
always close to what's deployed, unfinished work can't just live on a
branch indefinitely. Teams handle this with **feature flags** — the
code for an incomplete feature ships to `main` and even to production,
but stays switched off in configuration until it's ready, so merging
early never means shipping early.

## Which one will you actually meet

Most companies doing continuous deployment — ship to production
multiple times a day — use trunk-based development, often enforced by
required status checks on `main` (Chapter 4 covers exactly how). Git
Flow still shows up on projects with real versioned releases: mobile
apps waiting on app-store review, installed enterprise software,
open-source libraries doing semantic-versioned releases. Neither is
"wrong" — they're solving different release problems. The signal to
look for: how many long-lived branches does the team actually have,
and how often does code reach `main`?

## Key terms

| Term | Meaning |
|---|---|
| Git Flow | Strategy with `main`, `develop`, `feature/*`, `release/*`, `hotfix/*` branches, built for scheduled releases |
| Trunk-based development | Strategy with one long-lived branch and short-lived feature branches merged frequently |
| Feature flag | A runtime switch that hides unfinished code in production until it's ready, decoupling merge from release |
| Release branch | A Git Flow branch cut from `develop` to stabilize a specific release, accepting only bug fixes |

## Lab

1. In a practice repository, simulate Git Flow: create `develop`, a
   `feature/*` branch off it, merge it back, then cut a `release/*`
   branch and merge it into both `main` and `develop`.
2. In a second practice repository, simulate trunk-based development:
   create and merge three small, short-lived branches straight into
   `main` within the same session.
3. Write one paragraph arguing which strategy you'd pick for a mobile
   app shipping to app stores versus a SaaS web product deploying
   continuously — and why.

## Check yourself

You're ready for Lesson 13 when you can draw both branch models from
memory and explain, for a project you're not familiar with, which
strategy its release pattern suggests it's using.
