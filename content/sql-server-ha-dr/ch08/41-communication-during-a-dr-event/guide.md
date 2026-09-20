# Communication During a DR Event

SQL Server Database Administration's "Escalation & Communication" lesson covered this
for a routine incident — a slow query, a blocked process, a single application affected.
A declared disaster is that same problem at much higher stakes: more people are
affected, more stakeholders are watching, and the DBA team doing the actual recovery
work is exactly the group that shouldn't also be fielding every question as it happens.
This lesson closes the DR planning chapter with the communication component the plan
itself named back in "DR Plan Components."

## What you'll learn

- Why a defined chain of command matters more during a disaster than during a routine
  incident
- Why the recovery team and the communication role need to be different people
- What honest status updates look like when the stakes are a full disaster, not a
  single ticket

## A defined chain of command, decided in advance

During a routine incident, figuring out who talks to whom as you go is survivable.
During a disaster, it isn't — the volume of people who want information (leadership,
other IT teams, sometimes customers or the public) is much larger, and figuring out the
chain of command live, under pressure, wastes time the recovery itself needs. This is
exactly why "DR Plan Components" named roles and a communication plan as required parts
of the document: who declares the disaster, who's the single point of contact for
status, and who they report to, all decided before the disaster, not during it.

## Why the recovery team shouldn't also field every question

The core problem this lesson addresses: if the same people restoring databases and
failing over Availability Groups are also answering a stream of "is it fixed yet"
messages from every direction, both jobs suffer. The technical work slows down because
attention is split, and the answers to stakeholders get worse because they're rushed.
The fix is structural, not effort-based — a designated communication role (sometimes an
incident commander, sometimes a specific manager) who owns talking to stakeholders,
gets updates from the recovery team on a set cadence, and translates that into what
each audience actually needs to hear, freeing the recovery team to just recover.

## Honest status updates, at disaster scale

The same shape from the escalation/communication lesson still applies — impact, current
action, and an ETA only when it's genuinely known — but at disaster scale, honesty
matters even more, because the audience and the consequences of getting it wrong are
both bigger. "We are executing the failover runbook for the customer database; expect
service partially restored within 30 minutes; next update at [time]" is honest and
useful. A guessed ETA that turns out wrong, repeated to leadership and possibly
customers, damages trust at a scale a single missed internal ETA never would.

## Closing the chapter

Every component from "DR Plan Components" now has depth behind it: the inventory and
RPO/RTO drive what technology gets used, testing and runbooks (previous lessons) confirm
the plan actually works, and this lesson closes the loop on the human side — who talks
to whom, and how, while the technical recovery is happening. A plan with excellent
technical runbooks but no communication structure still produces chaos during a real
event.

## Key terms

| Term | Meaning |
|---|---|
| Chain of command | The pre-decided structure for who declares, decides, and reports during a disaster |
| Communication role | A person dedicated to stakeholder updates, separate from the team doing recovery work |
| Status update (disaster scale) | Impact, current action, and ETA only if genuinely known — honesty over false certainty |

## Check yourself

During a live disaster, the lead DBA doing the actual AG failover is also personally
answering messages from five different stakeholders. What structural change from this
lesson would fix that, and why does it matter for the technical recovery itself?
