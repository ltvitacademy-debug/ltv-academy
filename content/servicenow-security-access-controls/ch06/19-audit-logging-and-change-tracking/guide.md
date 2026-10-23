# Lesson 19 — Audit Logging & Change Tracking

**Chapter 6 · Governance, Compliance & Audit · Lesson 19 of 24**

## What you'll learn

- What the `sys_audit` table actually records, and how it connects to field changes elsewhere on the platform
- The real detail most admins miss: auditing is not automatically on for every table and field
- How audit configuration is set, per table and per field, rather than as a single platform-wide switch
- The honest tradeoff behind that design: storage and performance cost versus a change history nobody asked for
- How to think about selective auditing as the practical, defensible default

## What sys_audit actually tracks

ServiceNow records field-level change history in a dedicated table,
`sys_audit`. When a record's audited field changes, an entry gets
written capturing what the field was, what it became, who changed it,
and when. That's distinct from the `sys_history_line` and `sys_journal`
mechanics some tables use for activity-log display — `sys_audit` is the
underlying change-history ledger that compliance and security reviews
actually query when someone asks "who changed this field, and to what
value, on this date." It's the same kind of record Lesson 18 argued
should exist for `security_admin` elevation events: a durable, queryable
trail of exactly what happened and who did it.

## The detail most people assume wrong: auditing isn't automatically on

It's easy to assume that if `sys_audit` exists, every field change on
every table is already being captured somewhere. It isn't. Which tables
and which fields actually get written to `sys_audit` is itself a
configuration decision, set through the Dictionary entry for each field
(or the table-level audit setting), not a platform default that quietly
covers everything out of the box. A field with auditing turned off can
change freely, over and over, with no `sys_audit` entry ever created for
it — and no amount of querying `sys_audit` after the fact will recover
history that was never captured in the first place.

```
Common assumption:                      Reality:
"sys_audit exists, so every field       Auditing is configured per table
 change everywhere must already          and per field, via the Dictionary
 be tracked."                            entry's "Audit" setting.
                                         An un-audited field's changes
                                         are never written to sys_audit —
                                         not recoverable after the fact.
```

## Why it's configured selectively, not switched on for everything

The obvious instinct is to turn auditing on for every field, on every
table, "just in case." That instinct runs into a real, honest cost.
Every additional audited field means every single update to that field,
across every record, on every table where it's audited, writes an
additional `sys_audit` row. At the scale of a busy production instance
— thousands of Incident updates a day, routine field edits across
dozens of tables — auditing everything compounds into real storage
growth and real additional write overhead on every save, for change
history that, realistically, almost nobody ever queries or reviews.
Auditing has a genuine cost; it is not a free safety net just because
the mechanism exists.

```
Audit-everything approach:              Selective-audit approach:
- Every field, every table audited      - Specific sensitive or compliance-
- Large, fast-growing sys_audit table     relevant fields audited
- Real storage + write overhead         - Smaller, more relevant history
- Mostly never reviewed                 - Actually reviewable when needed
```

## What's actually worth auditing

A well-implemented instance makes this decision deliberately, field by
field, around a simple question: would someone genuinely need to know
the change history of this specific field — for a compliance
requirement, a security investigation, or a dispute over what a record
said at a given point in time? Fields that typically clear that bar
include anything holding sensitive personal data, financial amounts,
approval or authorization states, and security-relevant settings like
role assignments or ACL conditions. Fields that typically don't clear
it include routine, low-stakes metadata that changes constantly and
carries no compliance or security weight on its own. The goal isn't
auditing more; it's auditing the fields someone will actually need a
history for.

## Connecting this back to Chapter 6 so far

This is the same discipline Lesson 18 asked for with `security_admin`
elevation — don't track everything indiscriminately, but do deliberately
track the things that genuinely carry risk or compliance weight, and
make sure that tracking is real and queryable when it's needed, not an
assumption that turns out to be empty. Lesson 20 picks this up directly:
several of the compliance frameworks ServiceNow implementations are
asked to support explicitly expect a real, selective, defensible audit
trail — not a blanket claim that "everything is logged somewhere."

## Key terms

| Term | Meaning |
|---|---|
| `sys_audit` | The table that records field-level change history — old value, new value, who, and when |
| Audit configuration | A per-table, per-field setting (via the Dictionary entry) that determines whether changes are written to sys_audit |
| Selective auditing | Deliberately auditing specific sensitive or compliance-relevant fields, rather than every field on every table |
| Audit overhead | The real storage and write-performance cost of each additional audited field, multiplied across every update |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
would turning on auditing for every field on every table actually be a
worse governance decision than auditing a deliberately chosen, smaller
set of sensitive or compliance-relevant fields?
