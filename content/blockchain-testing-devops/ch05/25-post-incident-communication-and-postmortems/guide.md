# Lesson 25 — Post-Incident Communication & Postmortems

**Chapter 5 · Monitoring & Incident Response · Lesson 25 of 29**

## What you'll learn

- What to say -- and not say -- in the first hour after a pause mechanism is triggered
- The four parts a real postmortem needs: timeline, impact, root cause, remediation
- Why public postmortems follow a consistent document shape, not a press-release tone
- Why "blameless" doesn't mean remediation items go unowned

## The pause isn't the end of the job

Lesson 24 ended with a pause mechanism buying time and stopping new damage. That's necessary, but it tells users nothing. Someone is watching the protocol's social channels, its Discord, its support inbox, right now, wondering what's happening to their funds. How that gets handled -- and what gets published afterward -- is its own discipline, and a chapter on incident response isn't complete without it.

## The first hour: say something true, fast

- **Acknowledge immediately.** Confirm you're aware and actively investigating. Silence in the first hour reads as denial or indifference, even when the team is working the problem hard.
- **State only confirmed facts.** Don't speculate about root cause or final scope before it's actually confirmed -- a wrong early guess has to be walked back later, which costs more trust than waiting would have.
- **Commit to a specific next update time.** "We'll update you soon" is not a commitment. "Next update at 18:00 UTC" is, and it gives people a concrete reason to wait instead of assuming the worst.

## Anatomy of a real postmortem

A postmortem worth publishing has four load-bearing parts:

- **Timeline.** Built directly from Lesson 24's alert history and monitoring data -- what happened, in what order, with timestamps. This is why that history mattered enough to keep.
- **Impact.** Specific numbers: funds affected, users affected, which contracts or functions were involved. Vague language here reads as evasive.
- **Root cause.** The actual technical mechanism -- not "a bug was found," but what the bug was and why existing tests and reviews (Chapters 1-3) didn't catch it.
- **Remediation.** What concretely changed as a result, so this specific failure mode can't repeat the same way.

## A minimal postmortem skeleton

```
## Summary
## Timeline (UTC)
## Impact
## Root Cause
## What Went Well
## What Didn't
## Remediation Items (owner, due date)
```

Public postmortems from real incidents in this space tend to converge on close to this shape. It's written as a document -- precise, factual, timestamped -- not as a press release softening what happened. Readers, including other teams watching for lessons, can tell the difference immediately.

## Blameless, not toothless

A postmortem process works best when it's blameless -- the goal is understanding what let the incident happen at the system level (a missing test, a gap in CI, an undercalibrated alert from Lesson 23), not identifying a person to blame. But blameless doesn't mean nothing changes: every remediation item in the postmortem still needs a named owner and an actual due date. A postmortem full of good intentions and no assigned follow-through just becomes a document nobody acts on.

## Key terms

| Term | Meaning |
|---|---|
| Postmortem | A structured, published account of an incident: timeline, impact, root cause, and remediation |
| Blameless postmortem | A postmortem process focused on systemic causes rather than individual fault |
| Remediation item | A specific, owned, dated action taken as a direct result of a postmortem's findings |

## Check yourself

You're ready for Chapter 6 when you can explain: why does stating only confirmed facts in the first hour matter more than appearing to have all the answers immediately, and what makes a postmortem "blameless" without also making it toothless?
