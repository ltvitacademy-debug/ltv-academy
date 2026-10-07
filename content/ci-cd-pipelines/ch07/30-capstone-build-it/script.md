# Script — Capstone: Build It

## Segment 1 (title)

Lesson 29 defined the plan. This lesson is the build itself — a complete, working GitHub Actions pipeline for Northbridge Retail's storefront API, assembled piece by piece from everything earlier chapters taught. Treat this as a worked example to build alongside, not just read.

## Segment 2 (code)

The first job, build-and-test, checks out the code with actions/checkout, installs dependencies with caching from chapter two, and runs the test suite with npm test. Every other job needs this one, so a failing test stops everything downstream, including the image build and both deployments — that's Continuous Integration doing its job, exactly as chapter one defined it.

## Segment 3 (code)

The second job only runs on main, never on a pull request from an untrusted fork, and logs into GitHub's container registry using the automatic token secret. It pushes an image tagged with the commit SHA — the exact artifact the rest of the pipeline deploys downstream.

## Segment 4 (steps)

The last two jobs target two environments. Deploy-staging runs automatically the moment the image is pushed — Continuous Deployment. Deploy-production targets an environment with required reviewers configured in the repository settings, so it pauses and waits for a human to click approve — Continuous Delivery, exactly as planned in the last lesson.

## Segment 5 (outro)

Before calling it done, confirm all four things hold: a broken test actually blocks the merge, a passing merge produces a real tagged image in the registry, staging updates within a minute or two with no human action, and production does not update until someone explicitly approves it. Up next, lesson thirty-one: wrapping this up for a portfolio.
