# Script — On-Call Practices & Incident Management

## Segment 1 (title)

Finding the cause of an outage is only half the job. Someone has to be reachable, someone has to decide how serious it is, and someone has to run the response so a dozen people aren't all debugging in parallel with no coordination. This lesson covers who does what during an incident.

## Segment 2 (steps)

An on-call rotation puts one person or a small group on the hook for alerts at a time, rotating through the team so everyone knows whose phone buzzes. An escalation policy defines what happens if that page goes unacknowledged — it re-routes to a secondary, then a team lead — because people sleep through phones, and a page should never just die silently.

## Segment 3 (steps)

Not every alert deserves the same response, so teams grade impact on a severity scale. SEV1 is widespread customer impact — page everyone, assign an incident commander. SEV2 is partial impact, on-call paged, commander likely. SEV3 and SEV4 are minor or internal-only, handled without a broad page. Severity decides who gets paged and whether a status page update goes out.

## Segment 4 (steps)

For a SEV1 or SEV2, one person is named incident commander — and their job is to coordinate, not to fix. They track who's investigating what, own the status page and stakeholder updates, and decide when to escalate further. During Northbridge's checkout incident, the commander isn't the engineer digging through traces — that separation is deliberate, because managing communication and deep technical investigation are different jobs done badly by the same person at once.

## Segment 5 (outro)

Severity, rotation, escalation, and a commander who coordinates instead of debugging — that's the structure around every real incident. Next up, lesson twenty-six: runbooks and automation, what the responding engineer actually follows step by step.
