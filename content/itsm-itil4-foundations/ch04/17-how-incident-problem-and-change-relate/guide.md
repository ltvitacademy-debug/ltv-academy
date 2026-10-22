# Lesson 17 — How Incident, Problem & Change Relate

**Chapter 4 · Core ITIL 4 Practices: Incident, Problem & Change · Lesson 17 of 28**

## What you'll learn

- The real end-to-end flow connecting incident, problem, and change
- Where a workaround fits before a permanent fix exists
- Why a problem can't fix itself without going through change enablement
- How this loop closes back on preventing future incidents
- The handoff points where each practice's responsibility ends

## Three practices, one loop

Taught separately, incident, problem, and change management can
sound like three unrelated jobs. In a real service desk, they're one
continuous loop, and the join points between them matter as much as
each practice individually. Understanding where one practice's
responsibility ends and the next one's begins is exactly what keeps
an organization from either sitting on a recurring problem forever,
or changing production systems with no real evaluation of risk.

## Step one: the incident gets logged and resolved

It starts where Lesson 14 left off: something breaks, gets logged,
categorized, prioritized, and resolved — ideally fast, possibly with
a workaround, by incident management. If the incident is a one-off
and never recurs, the story can end right there. Most incidents do.
The loop only continues when something about this incident is
*wrong* in a deeper sense: it keeps coming back, or the cause isn't
understood even though the symptom was fixed.

## Step two: recurrence or uncertainty opens a problem

When the same failure shows up again — or shows up once but with
enough severity that nobody wants to risk it recurring — problem
management picks up where incident management left off. Problem
identification flags the pattern, problem control investigates and
finds the actual root cause, and if a permanent fix isn't ready yet,
it becomes a known error with a documented workaround that incident
management can reuse immediately next time the symptom appears. This
is the handoff from Lesson 15: incident management keeps restoring
service on each occurrence, while problem management works the
deeper cause in parallel.

## Step three: the fix requires a change

Here's the critical constraint: problem management can diagnose a
cause perfectly and still have zero authority to fix it. If the
permanent fix means altering a configuration item — a server setting,
a piece of code, a network rule, a database schema — that's a change,
and it has to go through change enablement exactly like any other
change. A known error's fix typically becomes a normal change: it
gets assessed for risk and impact, authorized by the appropriate
change authority, and scheduled. If the known error is actively
causing a major incident, the fix might instead go through as an
emergency change, authorized fast but still authorized, per Lesson
16.

## Step four: the loop closes

Once the change is implemented successfully, the known error is
closed, the problem record is closed, and — this is the point of the
whole loop — the incidents this cause used to produce stop
happening, or happen far less. That's the business value of running
all three practices as a connected system rather than three silos:
incident management kept the business running while the real cause
was still live, problem management made sure that cause didn't stay
a mystery forever, and change enablement made sure the fix went in
safely instead of causing a new incident of its own.

## Key terms

| Term | Meaning |
|---|---|
| Workaround | A temporary way to restore service without fixing the underlying cause |
| Known error | A problem with a root cause identified but no permanent fix yet |
| Normal change | The usual path for implementing a known error's permanent fix |
| Emergency change | The expedited path when a known error's fix can't wait for normal scheduling |
| Closed loop | Incident restores, problem diagnoses, change fixes — feeding back into fewer future incidents |

## Check yourself

A known error has been identified: a misconfigured timeout setting is
causing a report generation incident every few weeks, and the fix is
understood. Walk through, in order, which practice is responsible for
each of these: (1) keeping the business running every time it recurs
before the fix lands, (2) deciding the fix is correct and safe to
apply, (3) actually making the production change.
