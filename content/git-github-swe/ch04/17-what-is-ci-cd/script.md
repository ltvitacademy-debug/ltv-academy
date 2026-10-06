# Script — What Is CI/CD?

## Segment 1 (title)

CI/CD gets used as one buzzword, but it's really three separate practices, each automating more of the process than the one before it.

## Segment 2 (screenshot: ci-cd flow diagram)

Continuous Integration builds and tests. Continuous Delivery automatically releases to a repository, ready to ship. Continuous Deployment automatically deploys straight to production. Delivery and deployment are not the same word by accident.

## Segment 3 (steps: what each stage does)

CI is what you've been building toward since chapter one: build and test automatically on every push, catching a broken change the moment it's introduced. Delivery packages every passing change and makes it ready — a human still clicks ship. Deployment removes that last click entirely.

## Segment 4 (steps: delivery vs deployment)

A bank processing regulated transactions might want delivery — always tested and ready, but released on a deliberate schedule. A SaaS product shipping dozens of changes a day might run full deployment, trusting its tests and monitoring enough to skip the manual gate.

## Segment 5 (outro)

Next lesson: GitHub Actions fundamentals — the actual mechanism behind every stage of this chain.
