# Lesson 2 — Priority, Impact & Urgency

**Chapter 1 · Implementing Incident Management · Lesson 2 of 32**

## What you'll learn

- A quick recap of Impact and Urgency as ITIL concepts, now as implementation decisions
- The real `priority_lookup_rule` table, and how it auto-calculates Priority
- Why letting the platform calculate Priority beats leaving it a manual field
- The real trade-off: consistency vs. flexibility, and when manual override earns its place
- How to build and read a Priority Lookup Rule matrix

## Impact and Urgency, now as implementation decisions

ITSM Foundations introduced Impact (how many people or services are
affected) and Urgency (how quickly the business needs it fixed) as the two
ITIL inputs to Priority. Platform Fundamentals' Choice Lists lesson showed
you how a choice field like Impact or Urgency gets its value set — a
dropdown backed by a `sys_choice` entry, each with a label and an underlying
value. Implementing Incident Management means deciding what happens the
moment both of those choices are set on a record: does an agent now pick
Priority by hand, or does the platform calculate it?

## The Priority Lookup Rule: letting the platform do the math

Out of the box, ServiceNow ships a real mechanism for this: the
`priority_lookup_rule` table. Each row in that table is a rule mapping one
combination of Impact and Urgency to one Priority value — "Impact = 1 AND
Urgency = 1" maps to "Priority = 1 - Critical," "Impact = 3 AND Urgency = 3"
maps to "Priority = 4 - Low," and so on across the full grid. When an agent
sets Impact and Urgency on an incident, the platform looks up the matching
row and sets Priority automatically — no separate click, no guesswork, and
no incident sitting with Impact and Urgency set but Priority left blank.

## Calculated vs. manual override: the real trade-off

This is a genuine implementation choice, not a default to accept blindly.
**Letting the lookup rule calculate Priority** keeps prioritization
consistent across every agent and every shift — two different people
logging the same Impact and Urgency always land on the same Priority,
which is exactly what a queue-sorted dashboard and any SLA definition
(covered later in this path) depend on. **Allowing manual override**
gives an experienced agent room to escalate a case the matrix
under-weights — a VIP caller, a regulatory deadline — but every override
is also one more place where two agents can disagree, and one more thing
an auditor will ask you to justify. Most mature implementations keep the
lookup rule as the default and log every manual override, rather than
disabling the rule's calculation entirely.

## Building the lookup matrix

Implementing this well means populating `priority_lookup_rule` deliberately,
not accepting ServiceNow's defaults without review: confirm the business's
own definitions of Impact 1/2/3 and Urgency 1/2/3 actually match what the
default matrix assumes, and confirm Priority 1 (Critical) is reserved for
combinations that genuinely warrant it — a matrix where everything lands on
Critical is as broken as one where nothing ever does.

## Key terms

| Term | Meaning |
|---|---|
| Impact | How many people or services are affected by an incident |
| Urgency | How quickly the business needs the incident resolved |
| `priority_lookup_rule` | The real table mapping Impact × Urgency combinations to a Priority value |
| Manual override | Letting an agent set Priority by hand instead of accepting the calculated value |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: what real
table auto-calculates Priority from Impact and Urgency, and what is the
actual trade-off between letting it calculate Priority versus allowing
manual override?
