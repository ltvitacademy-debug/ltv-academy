# Script — Automated Incident Creation

## Segment 1 (title)

A chat notification is easy to miss during a busy shift. A real ticket in the system your team already tracks work through is harder to lose. This lesson covers a script that doesn't just notify, it opens an actual incident.

## Segment 2 (code: the pattern — script calls ticketing API)

Most modern ticketing systems — ServiceNow and Jira are two widely used examples — expose a REST API for creating a ticket. Structurally it's the same shape as the chat webhook: authenticate, POST a structured payload, get a ticket ID back. The exact field names differ by product, so this is genuinely a read-your-own-docs step.

## Segment 3 (code: what a good incident actually needs)

A ticket that just says "something is wrong" isn't much better than the chat notification alone. A useful incident names the specific instance and check, the actual metric value against the threshold, and a timestamp — enough for a responder to triage without re-running the check themselves.

## Segment 4 (outro)

Next up: reducing alert fatigue through automation — tuning thresholds against real baseline data so the alerts that do fire actually matter.
