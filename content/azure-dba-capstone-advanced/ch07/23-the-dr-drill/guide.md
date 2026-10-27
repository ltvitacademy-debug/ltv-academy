# Lesson 23 — The DR Drill: A Real Failover Under Pressure

**Chapter 7 · The Incident, Presenting, and Wrap-Up · Lesson 23 of 26**

## What you'll learn

- Why this drill is unannounced, and whose decision that is
- What actually happens when the DR runbook gets executed for real, under pressure
- How this differs from Lesson 13's own controlled test
- What a DBA does, and doesn't do, differently when the test is a surprise

## Why leadership triggers this one, unannounced

Lesson 13 tested the failover group on the DBA's own terms — planned, expected, with full
attention on watching it work. That's a necessary first test, but it's not the same thing as
proving the DR runbook (Lesson 15) actually works when nobody scheduled it. Overlook's leadership —
the same board from Lesson 1 that mandated this entire project — decides to trigger an unannounced
drill: a declared "disaster" with no advance warning to the DBA team, specifically to find out
whether the runbook holds up under realistic pressure, not just under ideal conditions.

## What actually happens

The drill starts the way a real incident would: an alert fires (or leadership directly declares the
test), and the on-call DBA has to open the DR runbook — the actual document from Lesson 15, not a
memory of what it says — and follow it step by step. That means:

1. **Checking the trigger criteria** from the runbook to confirm this genuinely warrants a
   failover, not a brief blip to wait out.
2. **Running the exact `Switch-AzSqlDatabaseFailoverGroup` command** from the runbook, against the
   secondary server, exactly as documented — not from memory, not improvised.
3. **Working through the verification checklist** — confirming the listener endpoint repointed,
   confirming the scheduling application reconnected, confirming data on the new primary is
   correct.
4. **Communicating status** per the runbook's communication plan, while the failover is actually in
   progress — not after it's already resolved.

## How this differs from Lesson 13's test

Lesson 13's test had the luxury of full attention and no real stakes. This drill has the DBA
working from a document instead of from memory, under the same kind of pressure a genuine incident
would create, with leadership watching whether the *process* — not just the technology — actually
holds up. A failover group that works perfectly but a runbook nobody can actually follow under
pressure is still a real gap; this drill is specifically designed to surface that gap if it exists.

## What a DBA does differently under a surprise test

The honest, correct response to an unannounced drill is the same discipline a real incident
demands: resist the urge to improvise from memory instead of opening the actual runbook, resist the
urge to skip steps that feel "obviously fine," and resist the urge to under-report a real problem
just to make the drill look clean. The value of this entire exercise depends on treating it exactly
like the real thing it's rehearsing for.

## Key terms

| Term | Meaning |
|---|---|
| Unannounced drill | A DR test triggered by leadership with no advance warning to the team executing it |
| Trigger criteria | The runbook section confirming whether a situation genuinely warrants failover |
| Process under pressure | Testing whether the documented runbook, not just the technology, actually works when executed for real |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: what is this drill actually
testing that Lesson 13's own controlled test could not?
