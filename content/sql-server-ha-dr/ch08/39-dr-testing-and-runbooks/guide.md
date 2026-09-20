# DR Testing & Runbooks

A DR plan document sitting untested in a shared drive is a hypothesis, not a plan. This
lesson covers why testing is non-negotiable, the two real levels of testing available,
and what actually separates a runbook that works during a real incident from one that
just looks thorough on paper.

## What you'll learn

- Why an untested DR plan cannot be trusted
- Tabletop exercises vs. a real failover drill — what each does and doesn't prove
- What a good runbook actually contains

## Why an untested plan isn't a real plan

A written plan encodes assumptions: that the backup files are actually where the
document says, that the person named for a role still works there, that the failover
steps still match the current AG configuration after six months of changes nobody
updated the document for. Every one of those assumptions can silently go stale. The
only way to know the plan still works is to actually exercise it — otherwise "we have a
DR plan" is really "we have a document we believe would work."

## Tabletop exercises

A tabletop exercise is a walkthrough: the team sits down, someone poses a disaster
scenario, and the group talks through the plan step by step — who would do what, in
what order, using which document — without actually touching production or DR systems.
It's low-cost, low-risk, and good at surfacing gaps in the plan itself: missing roles,
unclear escalation points, steps that reference a system that no longer exists. What it
can't validate is whether the actual technical steps work — whether that restore command
still runs cleanly, whether the failover actually completes in the time the RTO
requires.

## Real failover drills

A real drill actually executes some or all of the recovery — failing over an AG to its
secondary on purpose, restoring a backup to a test server and verifying the data, or (for
mature organizations) actually running production from the DR site for a defined window.
This is what validates the *technical* half of the plan: whether the runbook's commands
actually work against the current environment, and whether the real RTO is met or missed.
It costs more and carries more risk, which is exactly why most organizations use both
approaches — tabletop exercises frequently, real drills on a longer cadence — rather than
choosing one over the other.

## What a good runbook actually contains

The step-by-step procedures named in the "DR Plan Components" lesson are only useful if
they're specific enough to follow under pressure, by someone who may not be the person
who built the original system. A good runbook:

- Uses actual commands and scripts, not vague instructions ("run `RESTORE DATABASE ...
  WITH NORECOVERY` against server X" — not "restore the database")
- Specifies exact file paths, server names, and credentials/access needed — not "the
  usual backup location"
- Includes verification steps after each major action, not just the recovery action
  itself ("confirm the application can connect and a test transaction succeeds" — not
  just "bring the database online")
- Is dated and versioned, so stale copies referencing an old configuration aren't
  mistaken for current guidance

## The connection back to testing

Testing and runbook quality reinforce each other: a tabletop exercise reveals whether a
runbook step is even the right step; a real drill reveals whether the exact command in
that step still works. A runbook that's never been tested is exactly the kind of
document that reads fine until someone actually needs it during a real disaster.

## Key terms

| Term | Meaning |
|---|---|
| Tabletop exercise | A talk-through of the DR plan without touching real systems; validates the plan's logic and roles |
| Failover drill | Actually executing some or all of the recovery process to validate the technical steps |
| Runbook | Command-level, specific recovery procedure meant to be followed under pressure |

## Check yourself

A team has run tabletop exercises every quarter for two years but has never actually
failed over their Availability Group. What real risk does that leave unaddressed, even
though the plan "has been tested"?
