# Lesson 22 — Runbooks That Actually Get Used at 3 A.M.

**Chapter 6 · On-Call and Operational Excellence · Lesson 22 of 32**

## What you'll learn

- Why a well-written runbook still fails if it's prose instead of a
  decision tree
- The structure that actually survives a 3 A.M. page: trigger
  condition, exact commands, branching logic, explicit escalation
  point
- Why "copy-pasteable" is a hard requirement, not a nice-to-have, for
  anyone reading a screen at 3 A.M. with one eye open
- Why a runbook written once and never run again is already stale,
  and what a real testing cadence looks like

## Prose explanations fail under real pressure

A paragraph that explains *why* a disk-fill alert matters is useful
reading on a Tuesday afternoon. At 3 A.M., mid-incident, with a pager
still buzzing, nobody reads paragraphs — they scan for the next
command to run. A runbook written as explanatory prose gets skipped,
not read carefully; the engineer ends up improvising from memory
instead, which is exactly the failure mode a runbook exists to
prevent. The fix isn't to write better prose. It's to stop writing
prose as the primary content and write a decision tree with commands
attached instead.

## The structure that survives 3 A.M.

A runbook that actually gets followed has four parts, in this order:

1. **Trigger** — the exact alert name or symptom this runbook
   answers, stated at the top, so the responder can confirm in one
   second that they're in the right document.
2. **Diagnose** — a short, ordered list of commands to run, each with
   the exact expected healthy output next to it, so the responder
   knows immediately whether that check passed or failed.
3. **Branch** — explicit "if X, do Y; if not X, do Z" logic. Not
   narrative description of options — an actual decision tree the
   responder can follow top to bottom without having to synthesize
   anything themselves.
4. **Escalate** — the exact condition under which this stops being a
   solo job, and exactly who to page next.

```
TRIGGER: Alert "api-gateway-p99-latency-high" fired

DIAGNOSE:
  kubectl top pods -n api-gateway
    -> expect no pod above 80% CPU limit
  kubectl get hpa api-gateway -n api-gateway
    -> expect current replicas < max replicas

BRANCH:
  IF any pod > 80% CPU AND replicas == max:
    -> capacity ceiling hit. Go to MITIGATE: scale-cap-raise.
  IF replicas < max AND HPA not scaling up:
    -> HPA misconfigured or metrics pipeline stalled.
       Go to MITIGATE: manual-scale.
  IF no pod over threshold:
    -> latency source is downstream. Go to RUNBOOK: db-latency.

MITIGATE (manual-scale):
  kubectl scale deployment api-gateway -n api-gateway --replicas=12
  Re-check p99 latency dashboard after 3 minutes.

ESCALATE IF:
  p99 still above SLO threshold 10 minutes after manual-scale
  -> Page secondary on-call + #incident-api channel.
```

## Copy-pasteable commands are a requirement, not a convenience

Every command in a runbook needs to be the literal, exact command —
real resource names, real namespace, real flags — not a template with
`<your-service-name>` the responder has to mentally fill in while
half-awake. Filling in a placeholder correctly under pressure is
exactly the kind of small cognitive step that goes wrong at 3 A.M.;
typos in a mitigation command can make an incident worse, not better.
If a runbook genuinely has to cover multiple services, write a
separate, fully concrete version per service rather than one
generic version with blanks.

## A runbook you don't test is already stale

Infrastructure changes continuously — resource names change, flags
get deprecated, dashboards get rebuilt, scaling behavior changes when
someone tunes the HPA. A runbook written six months ago and never
re-run has a real chance of containing a command that no longer works,
and the worst possible moment to discover that is during a live
incident. The fix is a testing cadence tied to two triggers: every
time a runbook is actually used in a real incident, the responder
re-validates it as part of the postmortem follow-up; and independent
of real incidents, game days (covered in Chapter 3) exercise runbooks
on a schedule — commonly quarterly for high-severity services — so a
runbook that's gone stale gets caught by a drill instead of by a
customer-facing outage.

## Key terms

| Term | Meaning |
|---|---|
| Decision tree runbook | A runbook structured as explicit if/then branches with commands, not narrative prose explaining options |
| Trigger section | The exact alert or symptom a runbook answers, stated first so the responder confirms they're in the right document |
| Copy-pasteable command | A literal, fully concrete command with real resource names — no placeholder the responder has to fill in under pressure |
| Runbook staleness | The risk that a runbook's commands no longer match real infrastructure because nobody has re-run it since the infra changed |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what
four sections does a 3 A.M.-ready runbook need, and what two triggers
should force a runbook to get re-tested?
