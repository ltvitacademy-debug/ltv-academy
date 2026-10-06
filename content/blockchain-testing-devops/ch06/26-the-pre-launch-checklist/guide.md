# Lesson 26 — The Pre-Launch Checklist

**Chapter 6 · Mainnet Launch · Lesson 26 of 29**

## What you'll learn

- How to turn 25 lessons of testing, CI/CD, deployment, hosting, and monitoring into one checklist
- Why "who can touch the contract after launch" is as much a launch item as the contract's own correctness
- Why monitoring and incident response have to be live *before* the first real transaction, not set up in response to one
- What this checklist deliberately leaves out, and why

## A checklist is how you tell "probably" from "actually"

By this point in the course, a lot has been built: a tested contract, a CI pipeline that gates merges, a verified deployment, a hosted frontend and indexer, live monitoring, and a rehearsed incident response plan. The risk at launch isn't usually that none of this exists -- it's that something *feels* done without anyone having actually confirmed it. A checklist exists to convert that feeling into a list of specific, checkable facts.

## The contract itself

- **Tests pass** -- the full suite from Chapter 1: unit tests, fuzz tests, invariant tests, fork tests against real mainnet state. Not just the happy-path tests Lesson 1 opened the course by warning against.
- **CI is actually gating merges** -- Chapter 2, Lesson 11's point exactly: a green check that nobody's allowed to merge past, not a check that runs and gets ignored.
- **Deployed and verified** -- Chapter 3, Lessons 13 and 14: the deployed bytecode matches the published source on the block explorer, for every network it's live on.

## Who can touch it after launch

- **Multisig-controlled** -- Chapter 3, Lesson 16's case for shared deployment authority applies even more once real funds are at stake. No single key should be able to deploy, upgrade, or pause alone.
- **Upgrade path reviewed** -- if the contract uses a proxy pattern (Chapter 3, Lesson 15), everyone who might need to execute an upgrade actually understands how it works, not just the person who originally wrote it.
- **Chain list finalized** -- every target chain from Chapter 3, Lesson 17's multi-chain deployment is actually deployed and verified, not just the first one that was convenient to test on.

## The stack around the contract

- **Frontend hosted and domained** -- Lesson 18's custom domain is verified, not just a working preview URL.
- **Indexer containerized properly** -- Lesson 19's pinned, scanned image, actually running continuously.
- **Secrets in CI, not code** -- Lesson 20's discipline, with keys rotated and scoped to least privilege.
- **RPC provider redundant** -- Lesson 21's fallback configuration in place, not a single provider as a single point of failure.

## Watching it go live

- **Monitoring is live** -- Lesson 22's dashboards are up and showing real data *before* the first real transaction, not configured in a panic after something already looks wrong.
- **Alerts are calibrated and tested** -- Lesson 23's trigger types actually fire in a test, not just saved and assumed to work.
- **The pause mechanism has been exercised** -- Lesson 24's circuit breaker has actually been triggered once, by the people who'd need to pull it for real, so the first time isn't during an actual incident.

## What this checklist deliberately leaves out

One item is conspicuously absent: a security audit and a bug bounty program. That's not an oversight -- it's substantial enough, and has enough of its own timing considerations, to need its own lesson. Lesson 27 covers it directly.

## Key terms

| Term | Meaning |
|---|---|
| Pre-launch checklist | A list of specific, verifiable facts confirming readiness, replacing a general sense that things are "probably fine" |
| Rehearsed pause | A pause mechanism that's actually been triggered in practice before launch, not just written and left untested |
| Upgrade path | The mechanism (often a proxy pattern) by which a deployed contract's logic can later be changed |

## Check yourself

You're ready for Lesson 27 when you can explain: why does this lesson insist the pause mechanism be exercised before launch rather than just confirmed to exist, and what single item was deliberately left off this checklist for its own lesson?
