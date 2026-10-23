# Lesson 4 — Major Incident Management

**Chapter 1 · Implementing Incident Management · Lesson 4 of 32**

## What you'll learn

- Why Major Incident Management (MIM) is a distinct process, not just "high Priority"
- The real `major_incident_state` field, and what each of its values means
- Why declaring a Major Incident is an explicit human decision, not an automatic one
- What a war room / bridge call actually adds that a normal incident doesn't need
- Why a formal post-incident review is a MIM-specific requirement

## Why Major Incident Management is a separate process

A Priority 1 incident and a Major Incident are not automatically the same
thing, even though the two get confused constantly in practice. Priority 1
tells you this specific incident is Critical by the Impact/Urgency matrix
from Lesson 2 — it still moves through the ordinary state model from
Lesson 1, handled by one assignment group. Major Incident Management is a
heavier, parallel process reserved for incidents whose severity crosses a
threshold the organization defines in advance — typically some combination
of Priority and the number of people or services affected — and it comes
with its own coordination overhead that a routine Priority 1 ticket doesn't
need and shouldn't be forced into.

## The major_incident_state field: candidate vs. declared

Modern ServiceNow instances implement this with a real field,
`major_incident_state`, distinct from the ordinary `state` field on the
incident record. Its values typically include **None** (not a major
incident), **Candidate** (flagged as meeting the threshold, awaiting a
decision), and **Declared** (confirmed as a Major Incident, MIM process is
active). Keeping this as a separate field, rather than overloading Priority
or State to mean "this is major," is what lets an incident stay Priority 1
in the ordinary sense while a completely separate workflow — notifications,
a major incident manager role, a bridge — spins up around it only once
Declared.

## Declaring a Major Incident is a decision, not an automatic trigger

This is the implementation point worth getting right: hitting the
Candidate threshold should surface the incident for review, not flip it to
Declared automatically. A human — usually a major incident manager or
on-call lead — reviews the Candidate and makes the actual declaration.
Automatic declaration sounds efficient but produces false positives (a
Priority 1 affecting one VIP user, correctly handled by a normal incident
process) and erodes trust in the MIM process the first time it fires for
something that didn't need a war room.

## War rooms, bridge calls, and communication cadence

Once declared, a Major Incident runs on practices a standard incident
doesn't: a dedicated **war room** or bridge call pulls the right people
into one place in real time instead of handing work off ticket-comment by
ticket-comment, and **stakeholder communication** moves to a fixed cadence
— updates every 15 or 30 minutes to leadership and affected business units
— instead of the ad hoc updates a normal incident's comments provide.

## The post-incident review requirement

A Major Incident also carries a requirement standard incidents don't:
a formal **post-incident review** (sometimes called a post-mortem) after
resolution, documenting the timeline, what worked, what didn't, and what
changes should follow — separate from the Resolution Code and Close Notes
a standard incident needs to close. That review is what turns a Major
Incident into the next chapter's subject: Problem Management, when the
review surfaces a root cause worth tracking on its own record.

## Key terms

| Term | Meaning |
|---|---|
| Major Incident Management (MIM) | A distinct, heavier process for incidents crossing a severity threshold, parallel to the ordinary incident lifecycle |
| `major_incident_state` | A field distinct from `state`, with values like None, Candidate, and Declared |
| War room / bridge | A real-time coordination space for a declared Major Incident, instead of ticket-comment handoffs |
| Post-incident review | A formal, documented review required after a Major Incident resolves, beyond standard Resolution Code and Close Notes |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
should hitting the Major Incident threshold make an incident a Candidate
rather than automatically Declared, and what does a Major Incident require
after resolution that a standard incident doesn't?
