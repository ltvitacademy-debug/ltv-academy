# Lesson 18 — Managing Code Lists

**Chapter 4 · Reference Data · Lesson 18 of 25**

## What you'll learn

- The lifecycle events a code list goes through: add, deprecate, retire
- Why deleting a code outright is almost always the wrong move
- Effective-dating a code list, and why it matters for historical reporting
- How to design a code table so lifecycle state is explicit, not implied

## The lifecycle of a code

A code list isn't static just because reference data is supposed to be "stable." Codes get **added** when a new valid value is needed (a new product category, a new country splits from another). Codes get **deprecated** when they shouldn't be used for new records anymore, but historical records still reference them. Codes get **retired** when they're fully removed from active use — which, for most well-run reference data, almost never means physically deleting the row.

That distinction — deprecated versus deleted — is the single most important idea in this lesson. The moment you delete a code outright, every historical record that referenced it points at nothing. A report running against last year's orders, which used a status code that's since been replaced, breaks or silently drops those rows. Deprecating a code (marking it inactive, no longer selectable for *new* records) while keeping the row in place for *old* records to reference is almost always the right move.

## Effective dating: when a value was true, not just whether it's active

A well-designed code table carries an **effective date** and, often, an **expiration date** for each code — the window during which that code's meaning was the current, valid one. This matters because business meaning genuinely changes over time: a country's official code can change after a political split, a tax category's rate rules can change at the start of a fiscal year, a status code's label might get reworded for clarity without changing its underlying meaning.

Without effective dating, a report re-run today against data from two years ago may apply *today's* understanding of a code to *that period's* data — producing a number that's technically computed correctly but historically wrong. Effective dating lets a query ask "what did this code mean on the date this record was created," not just "what does this code mean right now."

## A concrete code table design

A code list table generally needs, at minimum: the code itself, its description, an active/inactive flag (or the deprecated state), an effective-from date, and an optional effective-to date. Below is an illustrative example — a status code list for an order-management system — showing how those fields work together.

```
code   description          is_active   effective_from   effective_to
BO     Backordered          true        2019-01-01        (null)
CAN    Cancelled            true        2019-01-01        (null)
PEND   Pending Review       false       2019-01-01        2023-06-30
RVW    Under Review         true        2023-07-01        (null)
```

Here, "PEND" was retired on mid-2023 in favor of the clearer "RVW" — but it's still in the table, marked inactive, so any order placed before July 2023 with status "PEND" still resolves to a real, meaningful row instead of a broken reference.

## Who actually makes these changes

Nobody should be able to add or deprecate a code list value by editing a table directly in production. Lesson 19 covers the governance process in full, but the mechanical discipline starts here: every code list needs a defined owner, a documented reason for each addition or deprecation, and a predictable release process — the same rigor applied to a code change as to a code *list* change, because a typo in a reference table is just as damaging as a bug in application code.

## Key terms

| Term | Meaning |
|---|---|
| Deprecated code | A code no longer valid for new records, but kept in place so historical records can still resolve it |
| Effective date | The date from which a code's current meaning or active status applies |
| Retired code | A code fully removed from active use — the row is still rarely deleted outright |
| Code table | The reference table holding each code, its description, and its lifecycle/control fields |

## Lab

Think of a status or category dropdown you've seen change over time in an app you use (a project tool adding a new "Blocked" status, a form adding a new country). Sketch what you believe happened to the old values in the underlying code table when the new one was added — were old records relabeled, or did the old code just stop being offered for new entries?

## Check yourself

Explain why deprecating a code is almost always preferable to deleting it outright, using the "PEND" to "RVW" example from this lesson.
