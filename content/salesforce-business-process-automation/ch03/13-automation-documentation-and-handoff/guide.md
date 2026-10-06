# Lesson 13 — Automation Documentation and Handoff

**Chapter 3 · Applied Automation · Lesson 13 of 18**

## What you'll learn

- Why undocumented automation becomes a liability the moment its builder leaves
- The five things every piece of business process automation should have written down
- A reusable documentation template you can apply to the Lesson 11 and 12 case studies
- How documentation and handoff differ from just leaving comments in a Flow

## Why this matters

Go back to Harborline's quote approval process from Lesson 11. It works today because whoever built it understands exactly what it does. Six months from now, that person may have left the company, moved teams, or simply forgotten the details. The next admin who touches that approval process — to add a third tier, say — has two choices: carefully trace every criteria and action by clicking through the setup UI, or open a one-page document that already answers their questions. Only one of those is fast, and only one of those avoids breaking something nobody remembers the reason for.

This isn't about process notes being "nice to have." Chapter 2 covered automation collisions, recursion, and maintaining automation over time — all of that maintenance work depends on someone being able to answer "what is this supposed to do, and why was it built this way?" without re-deriving it from scratch.

## The five things to write down

Every piece of business process automation in this course — approval processes, record-triggered flows, scheduled actions — should ship with documentation answering five questions:

1. **Purpose** — what business problem does this solve, in one sentence?
2. **Trigger / entry criteria** — exactly what makes this fire, in plain language and in the actual logic?
3. **Who it affects** — which users, profiles, or record owners see its effects?
4. **Dependencies** — what other automation, fields, or processes does this rely on or interact with?
5. **Owner and last-reviewed date** — who maintains it, and when was it last checked against reality?

## A documentation template

```
Automation: Quote Discount Approval (Approval Process)
Purpose: Require sign-off on quotes discounted > 10%
Trigger: Status="Submitted" AND Discount_Percent__c > 10
Affects: Sales reps (submitters), managers and
         directors (approvers)
Depends on: Discount_Percent__c field, Manager lookup
            on User, Quote Status picklist
Owner: [name]   Last reviewed: [date]
```

That's the exact Lesson 11 process, documented in under ten lines. Anyone inheriting it can answer "why does this exist" and "what would break if I changed the entry criteria" without opening Setup first.

## Handoff is more than a document existing

A document nobody knows to look for isn't a handoff — it's a file. Real handoff means the documentation lives somewhere predictable (a pinned note on the automation itself, a shared team drive with a consistent naming pattern, or your org's internal wiki), and the outgoing or current owner actually walks the incoming owner through it at least once. The five-question template gives that conversation a structure instead of starting from "so, where do I even begin."

## Key terms

| Term | Meaning |
|---|---|
| Entry criteria documentation | A plain-language and logic-level description of what makes automation fire |
| Dependency | Another field, process, or automation that a given piece of automation relies on |
| Handoff | The act of transferring ownership knowledge, not just the existence of a document |

## Check yourself

You're ready for Lesson 14 when you can write a five-question documentation entry, from memory, for the Briarcliff SLA escalation design from Lesson 12.
