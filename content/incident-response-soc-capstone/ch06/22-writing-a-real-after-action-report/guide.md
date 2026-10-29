# Lesson 2 — Writing a Real After-Action Report

**Chapter 6 · Post-Incident Activity · Lesson 2 of 4**

## What you'll learn

- What a real after-action report (AAR) contains, section by section
- Why the report has to document a full timeline and root cause, not just "the incident is resolved"
- How to turn a lessons learned meeting's findings into action items with real owners and deadlines
- Why a good AAR drives organizational change — budget, policy, tooling — instead of just archiving what happened

## The document that outlives the meeting

Lesson 1's meeting produces findings, but a meeting's findings live in people's memory unless
something durable captures them. That's the after-action report: a written document that turns a
discussion into a record the organization can act on, reference months later, and hold itself
accountable to. A real AAR isn't a narrative essay — it's a structured document with the same core
sections every time, so anyone reading it (a new analyst, an auditor, a manager approving a budget
request) can find what they need without reading the whole thing.

## What a real AAR contains

- **Incident timeline** — a chronological record of what happened, in UTC or a consistently stated
  timezone: first indicator, detection time, escalation time, each containment action, and recovery
  completion.
- **Root cause** — not just the symptom that triggered the alert, but the actual underlying cause:
  a phished credential, an unpatched vulnerability, a misconfigured firewall rule.
- **Impact** — what was actually affected: which systems, how much data, whether there was any
  downtime or financial cost, and whether the incident needs to be reported to a regulator or
  customers.
- **Response actions taken** — the concrete steps the team executed during Detection & Analysis
  and Containment, Eradication & Recovery, stated plainly enough that someone who wasn't there can
  follow what was done.
- **What worked / what didn't** — the direct output of the lessons learned meeting, carried into
  the permanent record.
- **Action items** — the part that actually changes anything (see below).

## Action items need an owner and a deadline, or they don't exist

The single most common way an after-action report fails is that its "what should change" section
lists good ideas with no owner and no date — and six months later, nothing happened, because nobody
was actually on the hook for it. A real action item names a specific person or team, a specific
deadline, and a specific, checkable outcome. "Improve logging" is not an action item. "Jordan
(Platform team) configures the identity provider's MFA-status API for SOC read access by the 15th"
is. That specificity is what separates a report that drives real change from one that just documents
what already happened and gets filed away.

## A concrete example

Following up on Lesson 1's business email compromise, the AAR's action items section might read:
Jordan (Platform team) grants the on-call IR analyst role read access to MFA status in the identity
provider, due in two weeks. Priya (SOC lead) adds a step to the IR playbook requiring MFA status be
checked within the first five minutes of any account-compromise incident, due in one week. Both
items get tracked the same way any other work gets tracked — in a ticketing system, with an owner
and a due date — so Lesson 4's measurement step can later confirm whether they actually got done.

## Key terms

| Term | Meaning |
|---|---|
| After-action report (AAR) | The structured written record of an incident: timeline, root cause, impact, response, and action items |
| Root cause | The actual underlying reason an incident happened, distinct from the symptom that triggered the alert |
| Action item | A follow-up fix with a named owner and a deadline, tracked until it's actually completed |
| Impact assessment | The section of the AAR documenting what was actually affected — systems, data, cost, and reporting obligations |

## Check yourself

Without looking back: name the six sections a real after-action report contains, and explain why
"Improve logging" fails as an action item while "Jordan configures MFA-status API access by the 15th"
succeeds.
