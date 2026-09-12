# Lesson 16 — What Is CI/CD, Really?

**Chapter 4 · CI/CD Concepts · Lesson 16 of 25**

## What you'll learn

- The three distinct stages CI/CD actually refers to — not one thing
- Continuous Integration, specifically: merging and testing often,
  automatically
- The real difference between Continuous Delivery and Continuous
  Deployment
- Why this matters for a dbt project or a data pipeline, not just
  application code

## Three stages, one term

"CI/CD" gets used as one word, but it's actually three distinct
practices, chained together:

![A three-stage diagram: Continuous Integration (Build, Test, Merge), Continuous Delivery (Automatically Release to Repository), Continuous Deployment (Automatically Deploy to Production).](/courses/git-cicd/ch04/16-what-is-ci-cd/ci-cd-flow.webp)
*Each stage automates more than the one before it — and "CD" means two genuinely different things depending on which second stage you mean.*
Source: [Red Hat — What is CI/CD?](https://www.redhat.com/en/topics/devops/what-is-ci-cd)

## Continuous Integration: merge and test often

**Continuous Integration (CI)** means merging code changes back into a
shared branch frequently — multiple times a day on an active project —
with an automated build and test run on every merge. The alternative
it replaces: long-lived branches that diverge for weeks, then produce
a brutal, error-prone merge at the end. For a dbt project, CI means
every pull request automatically runs `dbt build` and `dbt test`
against the changed models before anyone merges — catching a broken
model or a failing test before it reaches `main`, not after.

## Continuous Delivery vs. Continuous Deployment

This is the distinction most people get wrong, because both are
abbreviated "CD":

- **Continuous Delivery** — every change that passes CI is
  automatically packaged and ready to release, but a human still
  clicks the button to actually ship it.
- **Continuous Deployment** — every change that passes CI ships
  automatically, with no human approval step at all.

For a data team, this maps directly onto real decisions: an
experimental dbt model might go through Continuous Delivery (built,
tested, ready — but a data lead approves before it hits the production
warehouse), while a well-tested internal reporting query might be
Continuous Deployment (merges to `main` and runs in production within
minutes, no approval needed).

## Why this applies to data work, not just application code

CI/CD started in software engineering, but nothing about "build, test,
merge automatically, then release with or without a human gate"
requires application code specifically. A dbt project has a build
step (`dbt run`), a test step (`dbt test`), and a release step
(promoting compiled SQL to a production schema) — the exact same shape
as any other CI/CD pipeline, just with SQL models instead of
application binaries.

## Key terms

| Term | Meaning |
|---|---|
| Continuous Integration (CI) | Merging and automatically testing changes frequently, against a shared branch |
| Continuous Delivery | Every passing change is release-ready automatically; a human approves the actual release |
| Continuous Deployment | Every passing change ships automatically, no human approval |
| Pipeline | The automated sequence of build, test, and release steps CI/CD runs |

## Lab

1. For a real project you work on (or dbt specifically), write down
   what "build," "test," and "merge" concretely mean for it.
2. Decide, for that same project, whether it should use Continuous
   Delivery or Continuous Deployment — and write one sentence
   justifying the choice based on how risky an unreviewed release
   would actually be.
3. Identify one thing in your current workflow that's still a manual,
   long-lived-branch process CI could replace.

## Check yourself

You're ready for Lesson 17 when you can explain, without looking it
up, the actual difference between Continuous Delivery and Continuous
Deployment — and which one your own project should use.
