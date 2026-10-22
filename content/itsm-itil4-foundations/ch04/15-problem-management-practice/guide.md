# Lesson 15 — Problem Management Practice

**Chapter 4 · Core ITIL 4 Practices: Incident, Problem & Change · Lesson 15 of 28**

## What you'll learn

- The ITIL 4 purpose statement for problem management
- The difference between a problem, a workaround, and a known error
- The three sub-practices: problem identification, problem control, error control
- Why problem management is about root cause, not speed
- How problem management reduces future incident volume, not just this one

## The purpose: fewer incidents, smaller impact

ITIL 4 defines the purpose of problem management as reducing the
likelihood and impact of incidents by identifying actual and
potential causes, and managing workarounds and known errors. A
**problem** is a cause, or potential cause, of one or more incidents.
Where incident management chases speed, problem management chases
depth. It's allowed to take longer, because its payoff isn't "this
one user is unblocked" — it's "this failure mode stops happening, or
hurts less when it does."

## Problem identification

Problems don't announce themselves the way incidents do. Problem
identification is the active work of spotting them: analyzing trends
across many incidents (the same error on five different servers this
month), reviewing a major incident after the fact, or a vendor
flagging a known defect in software the organization runs. A single
incident rarely proves a problem exists — it's the pattern, or the
severity of one occurrence, that triggers the investigation.

## Problem control: analysis and priority

Once a problem is identified, **problem control** is where it gets
analyzed and prioritized. This is root-cause-analysis territory:
digging into logs, configurations, and change history to understand
why the failure happens, not just that it does. Not every identified
problem gets the same attention — problem control assigns priority
based on the same kind of impact-and-likelihood thinking incident
management uses for urgency, but aimed at *future* incidents this
problem could cause rather than the one already happened.

## Error control: living with a known error

Once root cause is understood but a permanent fix isn't yet in place
— maybe it requires a vendor patch, a budget approval, or a change
that needs scheduling — the problem becomes a **known error**: a
problem that has been analyzed and not yet permanently resolved.
**Error control** manages known errors through to resolution,
tracking any workaround in use in the meantime so future incidents
tied to the same cause can be resolved faster even before the real
fix lands. A known error record links directly back to the incidents
it explains and forward to whatever change will eventually close it.

## Root cause, not speed

The practice's defining boundary: problem management is not judged by
how fast any single incident gets fixed — that's incident
management's job, and it can happen entirely independently, using a
workaround, while the problem investigation continues in parallel.
Problem management is judged by whether the same failure keeps
coming back. A workaround that incident management applies ten times
a month is a sign problem management has unfinished work: the
underlying cause is still there, still costing the business time,
until something changes the actual configuration or code at fault —
which is where change enablement enters the picture, covered next.

## Key terms

| Term | Meaning |
|---|---|
| Problem | A cause, or potential cause, of one or more incidents |
| Problem identification | Spotting problems, often from incident trends or a major incident review |
| Problem control | Analyzing a problem's root cause and assigning it priority |
| Known error | A problem that has been analyzed but not yet permanently resolved |
| Error control | Managing known errors, and their workarounds, through to a permanent fix |

## Check yourself

The same "report generation times out" incident has been logged nine
times this quarter, and each time the service desk restarts a
background job to clear it. What has incident management accomplished
each time, and what work has problem management clearly not finished
yet?
