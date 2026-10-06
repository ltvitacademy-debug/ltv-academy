# Expense Reports and Analysis

Lesson 15 traced one item at a time. In practice, finance leaders and consultants also need to look at expense spending in aggregate — across an entire department, quarter, or company — to spot trends, enforce policy at scale, and answer questions no single expense report could answer alone. This lesson covers Oracle's built-in reporting tools for exactly that.

## What you'll learn

- The seeded reports available for Expenses out of the box
- What OTBI (Oracle Transactional Business Intelligence) adds beyond seeded reports
- A handful of real analytical questions Castellan asks regularly
- Why spend classification matters for this kind of analysis

## Seeded reports

Oracle Fusion Expenses ships several prebuilt reports a consultant can point users to immediately, without building anything custom:

- **Expense Audit Report** — lists every report that was placed on the audit list, why, and the outcome, useful for an internal audit team reviewing how well audit rules are catching real problems.
- **Expenses by Business Unit / Cost Center** — aggregated totals, useful for a manager watching their own department's travel spend against budget.
- **Corporate Card Transactions Report** — reconciles card feed transactions against what has actually been attached to expense reports, directly supporting the aging check from lesson 9.
- **Payment Status reports** (shared with Payables) — show which expense-originated invoices are paid, pending, or on hold.

## OTBI: ad hoc analysis beyond the seeded reports

**Oracle Transactional Business Intelligence (OTBI)** lets a power user or consultant build their own analysis on top of live Expenses data, without waiting for IT to build a custom report. Unlike the fixed seeded reports, OTBI lets someone drag in exactly the dimensions they need — expense type, employee, cost center, date range, policy violation flag — and cross them however the question demands.

```
Example OTBI question (illustrative)
  "Show total Client Entertainment spend by region,
   for Q1 2026, where the item was flagged over-policy,
   broken out by whether it was waived or sent to audit."
```

No seeded report answers a question that specific, but OTBI, built on the same underlying data Subledger Accounting and Expenses already captured, can.

## Real questions Castellan asks regularly

- "Which three employees generated the most missing-receipt declarations last quarter?" — an input into deciding who needs a one-on-one conversation about documentation habits, independent of whether any single report was ever rejected.
- "Is our average hotel spend per night trending up faster than the policy limit has been adjusted?" — a signal that the policy itself may need revisiting, not just enforcement.
- "What percentage of corporate card transactions get attached to an expense report within 7 days versus sitting unassigned past 30?" — operational health of the card program, tying back to lesson 9.

## Why spend classification matters here

None of this analysis works if expense types and categories (lesson 3) were set up sloppily. If half of Castellan's client meals were miscoded as generic "Miscellaneous" instead of "Business Meal — Client Present," any report or OTBI analysis built on expense type will quietly undercount real entertainment spend. Good analysis depends entirely on the setup discipline from Chapter 1 — reporting cannot fix bad classification after the fact, it can only reveal, loudly, that it exists.

## Recap

Seeded reports cover the most common questions out of the box — audit outcomes, spend by business unit, card reconciliation, payment status. OTBI handles ad hoc questions seeded reports can't anticipate, built on the same live data. Both depend entirely on disciplined expense type and category setup from earlier in this course. Next up, lesson 17: a hands-on troubleshooting lesson that pulls together everything from this chapter and the last.
