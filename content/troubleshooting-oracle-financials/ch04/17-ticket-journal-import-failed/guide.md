# Ticket: Journal Import Failed

**Chapter 4 · General Ledger and Subledger Tickets · Lesson 2 of 5**

## What you'll learn

- Where Journal Import sits in the pipeline, before a journal ever exists as a journal
- How to read the specific error codes Journal Import returns
- Dynamic insertion: what it does, and why it being off changes the fix
- A resolution note for a legacy-system interface failure

## One step earlier than Lesson 16

Lesson 16 covered a journal that existed but wouldn't post. Journal Import is a step before that: it reads rows from the `GL_INTERFACE` table — typically fed by an external system, like a payroll or legacy feed — and turns them into actual GL journals. If Journal Import fails, there's no journal to even attempt posting yet; the rows are stuck in the interface table.

## The ticket

> **Ticket #40538 — Harbor & Vance Logistics.** GL analyst reports: "Nightly Journal Import from the legacy payroll system failed. 60 rows were supposed to come in and nothing did." Severity: High.

## Reading the actual error codes

Journal Import reports specific, documented error codes rather than a vague failure message. A few worth recognizing on sight:

| Code | Meaning |
|---|---|
| **EF04** | The account is invalid — check cross-validation rules and segment values |
| **EF03** | The account is disabled |
| **EU02** | The journal entry is unbalanced, and suspense posting isn't allowed |
| **WU01** | Unbalanced, but suspense posting *is* allowed, so Oracle processed it anyway (a warning, not a failure) |

## Investigating

1. **Open the Journal Import execution report.** All 60 rows show **EF04** — invalid account.
2. **Check dynamic insertion for this ledger.** It's set to **off** — meaning if a row's account combination doesn't already exist in the chart of accounts, Journal Import will not create it on the fly; it will simply reject the row.
3. **Trace the specific combination.** The legacy payroll system started sending a new department segment value this month (a new cost center that was added in payroll's own system but never communicated to GL) — a combination that has genuinely never existed in this chart of accounts.

## Root cause

The legacy payroll system began sending a new department/cost-center segment value that has no corresponding account combination in GL's chart of accounts, and because dynamic insertion is off for this ledger, Journal Import correctly rejected every row using that new value rather than silently creating a new combination.

## Resolving it

1. **Confirm the new cost center** with GL/Enterprise Structures (not just payroll) to get the correct combination created properly, with the right parent/rollup behavior — this is deliberately not something dynamic insertion should do automatically for a cost center, since that could create an incomplete or incorrectly structured combination.
2. **Create the account combination** properly in the chart of accounts.
3. **Re-run Journal Import** for the 60 rows still sitting in `GL_INTERFACE`.

## Documenting it

> **Ticket #40538 — Harbor & Vance Logistics.** Nightly Journal Import from the legacy payroll system failed for all 60 rows (error EF04 — invalid account).
> **Root cause:** Payroll began sending a new department/cost-center segment value never set up in GL's chart of accounts; dynamic insertion is off for this ledger, so Journal Import correctly rejected the unrecognized combination.
> **Fix:** Confirmed the new cost center with Enterprise Structures and created the account combination properly; re-ran Journal Import for the 60 held rows.
> **Verified:** All 60 rows imported successfully on re-run with no errors.
> **Note:** Recommend Payroll notify GL before introducing any new segment value, since dynamic insertion is intentionally off for this ledger.

## Key terms

| Term | Meaning |
|---|---|
| `GL_INTERFACE` | The staging table Journal Import reads from |
| Dynamic insertion | A setting that lets Journal Import create a missing account combination automatically, if turned on |
| EF04 | Error code for an invalid account combination |

## Check yourself

Why was it the right call here to create the account combination manually through Enterprise Structures, rather than simply turning dynamic insertion on for this ledger?
