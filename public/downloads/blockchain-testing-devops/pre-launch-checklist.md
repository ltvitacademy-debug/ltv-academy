# Mainnet Pre-Launch Checklist

Compiled from Lesson 26, which turns the course's own 25 preceding lessons
into one checklist. Copy this file for every real deployment and check
items off with a specific, verifiable fact — not a feeling that something
is "probably fine." Each item names the lesson it comes from so you can
go back and re-read the reasoning, not just the bullet.

## The contract itself

- [ ] **Tests pass** — the full suite: unit, fuzz, invariant, and fork
      tests against real mainnet state. Not just happy-path tests.
      _(Ch.1, Lessons 1-4)_
- [ ] **CI is actually gating merges** — a required status check nobody
      can merge past, confirmed in branch protection settings, not just a
      workflow that runs and gets ignored. _(Ch.2, Lesson 11)_
- [ ] **Deployed and verified** — deployed bytecode matches published
      source on the block explorer, for every network it's live on.
      _(Ch.3, Lessons 13-14)_

## Who can touch it after launch

- [ ] **Multisig-controlled** — no single key can deploy, upgrade, or
      pause alone. _(Ch.3, Lesson 16)_
- [ ] **Upgrade path reviewed** — if using a proxy pattern, everyone who
      might execute an upgrade actually understands how `_authorizeUpgrade`
      works, not just the original author. _(Ch.3, Lesson 15)_
- [ ] **Chain list finalized** — every target chain is actually deployed
      and verified, not just the first convenient one. _(Ch.3, Lesson 17)_

## The stack around the contract

- [ ] **Frontend hosted and domained** — custom domain verified, not just
      a working preview URL. _(Ch.4, Lesson 18)_
- [ ] **Indexer containerized properly** — pinned, scanned image, running
      continuously. _(Ch.4, Lesson 19)_
- [ ] **Secrets in CI, not code** — keys rotated and scoped to least
      privilege. _(Ch.4, Lesson 20)_
- [ ] **RPC provider redundant** — a fallback provider configured, not a
      single point of failure. _(Ch.4, Lesson 21)_

## Watching it go live

- [ ] **Monitoring is live** before the first real transaction, not
      configured in a panic after something looks wrong. _(Ch.5, Lesson 22)_
- [ ] **Alerts are calibrated and tested** — each trigger type actually
      fired in a test, not just saved and assumed to work. _(Ch.5, Lesson 23)_
- [ ] **The pause mechanism has been exercised** — triggered once, for
      real, by the people who'd need to pull it, before an actual
      incident. _(Ch.5, Lesson 24)_

## Deliberately not on this list

- [ ] **Security audit scheduled/complete**
- [ ] **Bug bounty program live**

These are substantial enough to need their own review process — see
Lesson 27 for audit timing and bug bounty structure. Do not treat an
unchecked item above as optional just because it's further down the list;
every item here was something a real exploit, somewhere, happened because
a team skipped it.
