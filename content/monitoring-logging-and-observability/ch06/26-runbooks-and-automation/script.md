# Script — Runbooks & Automation

## Segment 1 (title)

An incident at 3am is the worst possible time to figure out, from scratch, how to fix something. A runbook is what the on-call engineer opens instead of improvising. This lesson covers how to write one that's actually useful under pressure, and where automation belongs.

## Segment 2 (steps)

A runbook earns its place only with four parts. A trigger condition — exactly which alert it's for, not a vague symptom. Diagnostic steps that link the real dashboard and the real query, not something to reconstruct from memory at 3am. Remediation steps with the exact action and what success looks like. And an escalation path for when none of that resolves it, naming who to page next.

## Segment 3 (code)

Here's the shape. The trigger is a specific alert. Diagnosis is three concrete checks against real dashboards, in order. Remediation branches on what diagnosis found — pool saturated, increase it; recent deploy, roll it back. And escalation kicks in automatically after fifteen minutes with no cause found. Nothing here requires improvising under pressure.

## Segment 4 (steps)

Not every remediation step needs a human. Auto-remediation lets the system fix well-understood, reversible problems with no one in the loop — restarting a crashed pod, scaling out past a threshold. ChatOps keeps a human approving the call, but runs the command from chat so the whole incident channel sees what happened, who ran it, and the result, instead of someone switching to a terminal mid-incident. Resizing a connection pool has real cost implications, so that's a ChatOps command, not something you'd fully automate.

## Segment 5 (outro)

A good runbook turns a stressful 3am page into a checklist instead of an improvisation. Next up, lesson twenty-seven: postmortems — what you write once the incident is actually over.
