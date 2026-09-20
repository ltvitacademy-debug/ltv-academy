# On-Call Basics

Everything this chapter has covered — triage, common issues, escalation — gets tested most
directly during on-call: the rotation where a DBA is the first line of defense for whatever goes
wrong, often at 2am, often alone. Being effective on-call is less about heroics and more about
what's already prepared before the pager goes off.

## What you'll learn

- Why a runbook is the single highest-leverage thing an on-call DBA can have
- The real difference between paging-worthy and non-paging-worthy events
- Why a pre-built toolkit of scripts matters more at 2am than at 2pm

## The runbook

A **runbook** is a written, specific reference for handling known categories of incidents —
not general knowledge, but "if X happens, check Y, and if Y shows Z, do this." A good runbook
entry for "log growing unbounded" doesn't just say "investigate the log" — it gives the actual
query to check `log_reuse_wait_desc`, what each possible value means, and what action follows
from each one. The value of a runbook isn't that it teaches something new; it's that it removes
the need to *think clearly under pressure at 2am*, which is a genuinely harder thing to do than
thinking clearly at 2pm on a normal Tuesday. Half-awake pattern-matching against a checklist is
far more reliable than half-awake improvisation.

## What's actually paging-worthy

Not every anomaly should wake someone up, and treating everything as page-worthy is how
on-call rotations burn people out and teach them to ignore pages. The honest line: something is
paging-worthy if it's both urgent (it needs attention now, not at 9am) and actually actionable
by whoever's on call (there's something they can actually do about it right now). A slow report
that will still be slow at 9am and has no immediate mitigation isn't paging-worthy at 2am; a
production database that's actually down is. Getting this threshold wrong in either direction has
a real cost — too sensitive, and on-call becomes exhausting noise; too loose, and a real problem
sits unnoticed for hours.

## Why a pre-built toolkit matters

The best time to write a script that checks for blocking chains, or one that identifies the
top CPU consumers, is not during an incident at 2am — it's ahead of time, calmly, and tested. An
on-call DBA with a small folder of ready-to-run diagnostic scripts (blocking chains, top waits,
tempdb usage, log_reuse_wait_desc across all databases) can go from "paged" to "looking at the
actual problem" in under a minute. Without that toolkit, the same DBA is writing and debugging
T-SQL from memory, half-awake, while the incident continues. The toolkit isn't about knowing
different things — it's about not having to reconstruct them under pressure.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A written, specific reference mapping known incident symptoms to concrete diagnostic and response steps |
| Paging-worthy | An event that is both urgent and actionable by whoever is currently on call |
| Diagnostic toolkit | A pre-written, pre-tested set of scripts for common checks, ready to run during an incident |

## Check yourself

A slow-running report alert fires at 3am. The report will still be slow at 9am, and there's
nothing an on-call DBA could do about it at 3am anyway. Should this page someone? Why or why not?
