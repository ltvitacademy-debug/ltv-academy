# Lesson 24 — Validating RPO and RTO Were Met

**Chapter 7 · The Incident, Presenting, and Wrap-Up · Lesson 24 of 26**

## What you'll learn

- Why this validation has to happen honestly, even if the numbers don't look good
- How to actually measure real downtime and real data loss from the drill
- What the drill's real numbers were, against Lesson 11's targets
- What happens next if a target was missed — the correct response, not a cover-up

## Why this has to be honest, not flattering

Lesson 11 set an RPO of 5 minutes and an RTO of 1 hour. Lesson 23's drill either met those targets
or it didn't, and the entire point of running an unannounced test is defeated if the results get
rounded in a favorable direction afterward. A board that mandated this project specifically because
of a competitor's breach will ask a direct question — "did it work?" — and the answer needs to be
the real one, whichever it is.

## Measuring RTO: actual downtime

RTO is measured from the moment the disaster was declared to the moment the application was
genuinely reachable again — not from when the failover command was run, and not from when the
command *returned success*. Those three timestamps are often different, and the honest measurement
uses the first and the last:

```
Disaster declared:        14:02:00
Failover command run:     14:04:30
Command returned success: 14:11:15
Application reachable:    14:19:40   <- the real RTO measurement ends here

Observed RTO = 14:19:40 - 14:02:00 = 17 minutes 40 seconds
```

An RTO target of 1 hour, with an observed 17 minutes 40 seconds, is a genuine pass — and worth
stating with the actual number, not just "yes, it passed."

## Measuring RPO: actual data loss

RPO is measured by comparing the last confirmed write on the old primary before the disaster to the
most recent write actually present on the new primary immediately after failover — using Chapter 3's
audit log (Lesson 9) or application-level timestamps to find both:

```
Last write confirmed on old primary:   14:01:42
Most recent write found on new primary: 14:00:58

Observed data loss = 14:01:42 - 14:00:58 = 44 seconds
```

An RPO target of 5 minutes, with an observed 44 seconds of actual data loss, is also a genuine pass.

## What happens if a target is missed

If the observed RTO or RPO had exceeded its target, the correct response is not to hide it or
round it favorably — it's to document exactly what happened, identify the specific step that took
longer than planned (a slow DNS propagation, a verification step that took longer than expected),
and feed that back into Lesson 15's runbook as a real, named improvement. A missed target discovered
in a drill is exactly the outcome this chapter exists to produce safely — the alternative is
discovering it during an actual disaster.

## Key terms

| Term | Meaning |
|---|---|
| Observed RTO | The actual measured downtime during a real test, from disaster declared to application reachable |
| Observed RPO | The actual measured data loss during a real test, comparing old and new primary's last writes |
| Honest reporting | Stating the real measured result, whether it passed or missed the target |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: which three timestamps does an
honest RTO measurement actually use, and why is "the command returned success" not the right
endpoint for that measurement?
