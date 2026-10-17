# Blameless Postmortem Template

> Extracted from Lesson 16's real postmortem for the flash-sale checkout latency incident. Use
> this exact structure for your own capstone's postmortem — Category 7 of the acceptance rubric
> specifically requires every action item to have both an owner and a date, which this template
> enforces by its own shape.

```markdown
# docs/postmortems/YYYY-incident-short-name.md

## Summary
One or two sentences: what broke, for how long, at a high level.

## Impact
Concrete numbers if you have them — affected sessions, requests, revenue,
users. "Something felt slow" is not impact; "p99 exceeded 2s for 34
minutes, ~4,100 sessions affected" is impact.

## Timeline
HH:MM  What happened, and how you know (a specific metric, log line, or
       alert — not "things seemed off around then").
HH:MM  The next event, same standard of evidence.
HH:MM  Root cause identified — name the real diagnostic step that found
       it (a specific query, a specific command), not "we figured it out."
HH:MM  Resolved — what specifically fixed it.

## Root cause
What actually broke, mechanically. Be specific about the resource (a
connection pool, a cache, a quota) — "the service was slow" is not a
root cause, it's the symptom you already described in the Summary.

## Contributing factor
What made this worse or harder to catch than it should have been —
missing alerting, an undersized resource that was never load-tested, a
runbook that didn't point at the real cause. This section is often more
valuable than the root cause itself, since it's usually where the real,
systemic fix lives.

## Action items
- [ ] Specific, scoped fix #1. Owner: <name>. Due: <date>.
- [ ] Specific, scoped fix #2. Owner: <name>. Due: <date>.
- [ ] Specific, scoped fix #3. Owner: <name>. Due: <date>.
```

## The rule this template enforces

Every action item needs **both** an owner and a date. Lesson 16 states this plainly: "a
postmortem without both is a list of good intentions, not a fix." A postmortem with a long,
thoughtful root-cause section and action items like "we should add more monitoring" (no owner,
no date, not specific) is not actually done — it reads like analysis, not a commitment.

## What "blameless" actually means here

Every question in this template is "what in the system allowed this," never "who caused this."
Lesson 16's own postmortem is a working example: the root cause names an undersized, never-load-
tested connection pool — a systemic gap — not "an engineer configured the pool wrong." The
contributing factor names a missing saturation-based alert and an incomplete runbook — both
process gaps, not individual mistakes. If a draft of your own postmortem names a specific
person as the cause of anything, rewrite that section to describe the system or process gap
that let the mistake happen and go unnoticed, the same way Lesson 16's does.
