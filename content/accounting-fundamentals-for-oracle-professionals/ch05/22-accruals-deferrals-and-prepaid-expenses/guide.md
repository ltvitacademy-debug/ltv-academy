# Accruals, Deferrals and Prepaid Expenses

Several earlier lessons have hinted at this one: the full accrual/deferral family of adjusting entries, laid out as a single, organized map. By the end of this lesson, every "this doesn't need its own lesson, we'll come back to it" reference from Chapters 3 and 4 gets formally resolved.

## What you'll learn

- A clean 2x2 map of the four adjusting-entry categories
- How each one connects to an example you've already seen
- The direction cash moves relative to when the revenue/expense is recognized, in each case
- Why this single map covers nearly every period-end adjustment a business makes

## The 2x2 map

Every adjusting entry in this family answers two questions: Is it revenue or expense? And has cash already moved, or will it move later?

| | Cash hasn't moved yet | Cash already moved |
|---|---|---|
| **Revenue** | **Accrued Revenue** — earned, not yet billed/collected | **Deferred (Unearned) Revenue** — collected, not yet earned |
| **Expense** | **Accrued Expense** — incurred, not yet paid | **Deferred (Prepaid) Expense** — paid, not yet incurred |

## Walking through each quadrant, with examples you've seen

- **Accrued Revenue**: a bank has earned interest on a loan it made, but the interest payment isn't due from the borrower until next month. The bank records interest revenue now, with a receivable, even though no cash has arrived.
- **Deferred (Unearned) Revenue**: the subscription example from lesson 12 — a customer pays $12,000 upfront for a year of service. Cash arrived, but the service (and the revenue) is earned gradually, month by month.
- **Accrued Expense**: the wages example from lesson 15 — employees earned wages in March, but payroll doesn't run (paying cash) until April. The expense is recorded in March, with a liability, ahead of the cash.
- **Deferred (Prepaid) Expense**: the insurance example from lesson 13 — a business pays $12,000 upfront for a year of insurance. Cash went out immediately, but the expense is recognized gradually, 1/12th per month, as the coverage is actually used.

## Worked example: a full year of prepaid insurance

A fictional architecture firm, **Oakmere Design Studio**, pays $12,000 on January 1 for 12 months of insurance.

```
January 1 (cash paid, nothing expensed yet):
  Debit  Prepaid Insurance    $12,000
  Credit Cash                          $12,000

January 31 (one month used - adjusting entry):
  Debit  Insurance Expense     $1,000
  Credit Prepaid Insurance              $1,000
```

This same $1,000 adjusting entry repeats every month for the rest of the year, each time moving $1,000 out of the Prepaid Insurance asset and into Insurance Expense, until the full $12,000 has been expensed across 12 months — exactly matching the matching principle from lesson 13.

## Why this single map matters so much

Nearly every "timing mismatch between cash and the income statement" situation a business encounters fits into one of these four boxes. Once you can place a scenario into the correct quadrant, you already know which direction the adjusting entry needs to move.

## Why this matters for Oracle Fusion

Oracle Fusion supports all four of these patterns directly: Payables and Receivables both handle accruals and deferrals as part of normal transaction processing, Subledger Accounting rules can automatically defer revenue or expense recognition across a schedule, and General Ledger's reversing-entry feature (lesson 15) is the mechanism that cleans up many accrual-side adjustments. Recognizing which of the four quadrants a real-world Oracle Fusion scenario falls into is a skill you'll use constantly once you're configuring and troubleshooting the live system.

## Recap

Every accrual/deferral adjustment answers two questions — revenue or expense, and has cash moved yet — producing four categories: accrued revenue, deferred revenue, accrued expense, and deferred (prepaid) expense. Next up, lesson 23: depreciation concepts, a specific and very common deferred-expense pattern.
