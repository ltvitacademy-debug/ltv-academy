# Lesson 57 — Incident Response for Data Pipelines

**Chapter 3 · Production Data Engineering · Lesson 57 of 70**

## What you'll learn

- The five stages every incident actually moves through
- Mitigation vs. resolution — a distinction that saves real time
- Why communicating during an incident is its own separate task
- What "the incident is over" actually means

## Five stages, in order

```
1. Detect     -- Lesson 53's alert fires (or a person notices first)
2. Triage     -- how bad is this, really? (Lesson 53's severity tiers)
3. Mitigate   -- stop the immediate damage, even imperfectly
4. Resolve    -- fix the actual underlying cause
5. Review     -- what happened, and how do we prevent it (Lesson 58)
```

Every real incident passes through roughly this shape, whether or
not anyone names the stages out loud. Naming them explicitly is
what keeps a stressed, moving-fast team from skipping one — most
commonly, skipping straight from detection to resolution and
missing mitigation entirely.

## Mitigation vs. resolution — a genuinely different action

```
Mitigate (minutes):  pause the Activator rule that's spamming alerts,
                     or reroute the Eventstream around a broken destination
Resolve (hours/days): find and fix the actual bug in the Window
                     transformation causing bad aggregates
```

Mitigation stops the bleeding *right now*, even with an imperfect,
temporary fix. Resolution is the real fix, which almost always takes
longer to find and verify safely. Treating these as the same step
means users keep suffering while someone carefully investigates root
cause — mitigating first, then resolving, gets relief to users
immediately while the real fix is still in progress.

## Communication is its own task, not an afterthought

During a real incident, someone needs to be actively telling
affected people what's happening — even a short "we know, we're
investigating, next update in 30 minutes" is far better than
silence. This is genuinely separate work from actually fixing the
problem, which is why a real incident response process usually
assigns it to a different person than the one doing the technical
mitigation — one person fixing, one person communicating, so neither
task starves the other of attention.

## What "over" actually means

An incident isn't over the moment mitigation stops the immediate
pain — it's over once resolution has actually landed and verification
confirms the underlying cause is fixed, not just papered over. Calling
it "over" too early is how the same incident quietly recurs a week
later, because the mitigation was mistaken for a real fix.

## Key terms

| Term | Meaning |
|---|---|
| Mitigate | Stop the immediate damage now, even imperfectly |
| Resolve | Fix the actual underlying cause, which takes longer |
| Incident communication | A distinct task from the technical fix, needing its own owner |

## Check yourself

You're ready for Lesson 58 when you can explain, without looking: why
does treating mitigation and resolution as the same step usually make
an incident worse for users, not better?
