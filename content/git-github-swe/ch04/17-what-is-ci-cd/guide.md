# Lesson 17 — What Is CI/CD?

**Chapter 4 · CI/CD Basics · Lesson 17 of 22**

## What you'll learn

- Why "CI/CD" is really three distinct practices, not one
- Continuous Integration: what it automates, and what problem it solves
- Continuous Delivery vs. Continuous Deployment — the one-word difference that matters
- How everything in Chapters 1-3 was already building toward this

## Three stages, one term

"CI/CD" gets used as a single buzzword, but it names a chain of three
separate practices, each automating more of the process than the one
before it:

![A three-stage flow diagram: "Continuous Integration" (Build, Test, Merge, in teal) leading to "Continuous Delivery" (Automatically Release to Repository, in dark red) leading to "Continuous Deployment" (Automatically Deploy to Production, also dark red).](/courses/git-github-swe/ch04/17-what-is-ci-cd/ci-cd-flow.webp)
*Each stage builds on the one before it — and "delivery" and "deployment" are not the same word by accident.*
Source: [Red Hat — What is CI/CD?](https://www.redhat.com/en/topics/devops/what-is-ci-cd)

## Continuous Integration (CI)

This is the part you've actually been building toward since Chapter 1.
Every time someone pushes a commit or opens a pull request, an
automated process builds the code and runs the test suite —
immediately, on every change, not "whenever someone remembers to." The
goal is to catch a broken build or a failing test the moment it's
introduced, while it's still one person's change and still fresh in
their head, instead of after it's buried under three weeks of other
people's work.

Lesson 9's pull requests, Lesson 10's code review, and Lesson 19's
automated test runs all feed into this: CI is what turns "someone
should run the tests before merging" into something that happens
automatically, every time, with no one able to forget.

## Continuous Delivery vs. Continuous Deployment

This is where the two "CD"s split, and the difference is a single
word:

- **Continuous Delivery** means every change that passes CI is
  automatically packaged and made *ready* to release — but a human
  still clicks the button to actually ship it. The team always has a
  releasable build sitting there; release timing stays a business
  decision.
- **Continuous Deployment** removes that last click. Every change that
  passes CI deploys straight to production, automatically, with no
  human approval step at all.

The difference matters a lot in practice. A bank processing regulated
transactions might want Continuous Delivery — tested and ready at all
times, but deployed on a deliberate schedule. A SaaS product shipping
dozens of small changes a day might run full Continuous Deployment,
trusting its test suite and monitoring enough to skip the manual gate
entirely.

## It's not just application code

Nothing about this chain is specific to web apps or backend services.
Any process with a "build, verify, release" shape benefits from the
same automation — a dbt project running `dbt run` (build) and
`dbt test` (test) before promoting models to a production schema is
CI/CD applied to a data pipeline, using the exact same mechanism
(Chapter 4 teaches that mechanism — GitHub Actions — generically).

## Key terms

| Term | Meaning |
|---|---|
| Continuous Integration (CI) | Automatically building and testing every change, on every push or PR |
| Continuous Delivery | Every change that passes CI is automatically made release-ready; a human still approves the actual release |
| Continuous Deployment | Every change that passes CI deploys to production automatically, with no manual approval step |
| Pipeline | The automated sequence of build/test/release steps a CI/CD tool runs |

## Lab

1. Pick a real project (yours, or an open-source one you use) and
   figure out, from its repository, whether it's practicing CI,
   Continuous Delivery, or Continuous Deployment — look for a
   `.github/workflows/` folder and read what triggers deployment.
2. Write two sentences arguing which of Delivery or Deployment you'd
   choose for a project you're currently working on, and why.

## Check yourself

You're ready for Lesson 18 when you can explain the one-word
difference between Continuous Delivery and Continuous Deployment
without hesitating, and name which of the three stages a given
automated step in a real pipeline belongs to.
