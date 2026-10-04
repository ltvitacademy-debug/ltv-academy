# Lesson 18 — Critical Data Element Documentation

**Chapter 4 · Critical Data Elements · Lesson 18 of 25**

## What you'll learn

- Why a CDE's documentation needs fields a standard dictionary entry doesn't have
- The four additional fields a CDE record adds on top of the standard dictionary entry
- A worked, fully documented CDE record for `OrderTotal`
- Why this extra documentation burden is deliberately reserved for CDEs only

## Starting from the standard entry

A CDE record starts from the same base as any dictionary entry (Lesson 11): name, definition, type, owner, status, last reviewed. CDE status doesn't replace any of that — it adds to it, because the elevated risk Lesson 16 and 17 established justifies capturing more than the standard entry does.

## Four additional fields a CDE record needs

1. **Source system of record** — the one authoritative system this element originates from, named explicitly, not "wherever it happens to live." If an element has multiple apparent sources, that itself is a governance finding worth flagging, not something to paper over.
2. **Validation rule reference** — a direct link to the actual data quality rule (Data Quality Management, Lesson 17) that checks this element, not a vague note that "it's checked somewhere."
3. **Lineage summary** — a short description of how this element gets from its source to wherever it's consumed (the next course in this path, Data Lineage & Impact Analysis, covers full lineage documentation; a CDE record needs at least a summary version now).
4. **Escalation contact** — who gets notified immediately when this specific element fails a quality check, distinct from the general owner field, because a CDE failure often needs faster response than routine dictionary maintenance.

## A worked, fully documented CDE record: OrderTotal

| Field | Value |
|---|---|
| Name | `dbo.Orders.OrderTotal` |
| Definition | The total dollar value of a completed order, including tax and shipping |
| Type | `DECIMAL(10,2)`, not null |
| Owner | Finance Data Steward |
| Status | Approved |
| Source system of record | The order management system (not the data warehouse copy) |
| Validation rule | `DQ-ORD-002`: OrderTotal must be positive and match the sum of line items plus tax plus shipping |
| Lineage summary | Order management system → nightly ETL → `dbo.Orders` → feeds revenue reporting and commission calculations |
| Escalation contact | Finance Data Steward, with a 2-hour response SLA on validation failures |

Compare this to the three-field mini-dictionary entries from Lesson 14 — a CDE record is deliberately heavier, because the cost of getting `OrderTotal` wrong justifies the extra documentation effort in a way that a routine column doesn't.

## Why this is reserved for CDEs only

If every column in the dictionary required a source system of record, a validation rule reference, a lineage summary, and an escalation contact, documentation effort would collapse under its own weight — exactly the problem Lesson 16 warned about with treating everything as equally critical. The extra fields are valuable specifically *because* they're rare, applied only where the risk genuinely justifies the effort.

## Key terms

| Term | Meaning |
|---|---|
| Source system of record | The one authoritative system a data element originates from |
| Escalation contact | Who is notified immediately when a CDE fails validation, distinct from its general owner |

## Lab

For the highest-priority CDE you identified in Lesson 17's lab, sketch out the four additional fields: source system of record, a plausible validation rule, a one-sentence lineage summary, and who the escalation contact should be.

## Check yourself

Can you name all four additional fields a CDE record needs beyond a standard dictionary entry, and explain why this extra documentation burden is deliberately not applied to every column?
