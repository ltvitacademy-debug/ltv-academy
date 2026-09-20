# Capstone: Presenting Your Work

Everything in this capstone actually happened, in order: an inherited mess, a foundation fixed,
security and maintenance put in place, a real incident resolved, a real change deployed safely.
That's not just a project — it's the exact shape of a story a manager wants to hear in a
one-on-one, or an interviewer wants to hear in "tell me about a time you improved a system."

## What you'll learn

- How to structure this work as a five-beat story instead of a list of tasks
- Which specific, measurable numbers from Lessons 64-68 to lead with
- How to answer the follow-up questions this kind of story invites

## The five beats

1. **Inherited state.** MERSQL01: `sa` enabled and used by the app, no log backups on a FULL-
   recovery database, a 210 GB log file on an almost-full drive, `tempdb` misconfigured, zero
   maintenance jobs, zero change history.
2. **Fixes applied.** Storage separated across four volumes, `tempdb` reconfigured to four
   files, `max server memory` capped, `sa` disabled in favor of a least-privilege
   `dispatchtrack_svc` login, SQL Server Audit turned on, Ola Hallengren's jobs installed with a
   15-minute log-backup schedule.
3. **Incident handled.** A blocking chain from an open, idle transaction froze updates across 40
   terminals; found and resolved in 12 minutes using DMV-based triage, with follow-up actions
   opened rather than dropped.
4. **Change deployed safely.** A compliance-driven schema change went out as a reviewed,
   staging-tested, transaction-wrapped migration with a rollback script prepared in advance —
   the first entry in a change log that now exists.
5. **Measurable improvement.** This is the beat people remember.

## The numbers that matter

Vague claims ("I improved things") don't land. Specific before/after numbers do:

- **RPO:** undefined (weeks of possible data loss) → 15 minutes, via scheduled log backups.
- **Disk risk:** a 210 GB log file on a 91%-full drive → log and data separated onto dedicated
  volumes, log growth now bounded by regular backups.
- **Security exposure:** the application authenticating as `sa` → a scoped, least-privilege
  service login, with `sa` disabled and vaulted.
- **Incident response:** a full-outage blocking chain resolved in 12 minutes, with a documented
  root cause — versus no methodology and no DMV familiarity six weeks earlier.
- **Change safety:** one schema deployment shipped with peer review, a staging test, and a
  prepared rollback — the first of what's now a repeatable, documented process.

## Telling it well

In an interview, the strongest version of this story doesn't start with the fix — it starts
with the inherited state, told plainly and without exaggeration, because that's what makes the
"after" numbers meaningful. Then it moves fast through what was fixed and why, spends real time
on the incident (interviewers want the *mechanism* — which DMV, what you saw, what you did —
not just "I fixed it"), and closes on the change deployment as proof the improvements are
durable, not a one-time cleanup. Expect and prepare for the natural follow-up questions: *Why
didn't you drop the sa login entirely? What would you have done if killing session 82 hadn't
resolved it? How did you decide on a 15-minute log-backup interval instead of some other
number?*

## Key terms

| Term | Meaning |
|---|---|
| Before/after framing | Presenting a fix in terms of a measurable prior state and a measurable current state |
| RPO | Recovery Point Objective — how much data loss is acceptable, in time; the clearest metric in this story |
| Mechanism | The specific technical steps taken to diagnose or fix something, as opposed to just the outcome |
| Repeatable process | A fix that changes how future work happens, not just a one-time cleanup |

## Check yourself

Of the five numbers listed under "the numbers that matter," which one would you lead with in a
30-second answer to "tell me about a time you fixed a production issue," and why that one over
the others?
