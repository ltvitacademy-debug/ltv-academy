# Lesson 30 — Data Quality Case Study: Financial Data

**Chapter 6 · Applied Data Quality · Lesson 30 of 30**

## What you'll learn

- How to apply the full course — dimensions, profiling, rules,
  remediation, monitoring — to one connected financial-data scenario
- Why financial data raises the stakes on accuracy, validity, and
  timeliness specifically
- How a month-end close process depends on data quality work happening
  on a strict calendar, not whenever convenient
- How everything from Lesson 1 through Lesson 29 fits together as one
  practice, not thirty separate topics

**A note before you start:** the company in this case study,
**Ashgrove Components**, is entirely fictional — invented for this
lesson, like Lesson 29's Northfield Outfitters, to give the full course
one connected, concrete example to close on. It is not a real business,
and no figure here is a real company's actual financial data.

## The setup

Ashgrove Components is a fictional mid-size parts manufacturer. Its
finance team closes the books monthly, which means reconciling the
general ledger (GL) in its ERP system against two subledgers —
accounts payable (AP) and accounts receivable (AR) — that are supposed
to roll up to the same totals. This month, the reconciliation report
is off by $214,000, and close is due in two days. Unlike Lesson 29's
customer data problem, there's no slack here: the close calendar
doesn't move.

## Applying the dimensions (Chapters 1 and 3)

The finance data team doesn't start guessing — they start by naming
which dimensions could plausibly explain a reconciliation break,
because each one points to a different kind of root cause:

| Dimension | Could explain the break if... |
|---|---|
| **Accuracy** (Lesson 11) | A transaction was posted to the wrong GL account |
| **Completeness** (Lesson 12) | A batch of AP invoices never made it into the GL feed at all |
| **Timeliness** (Lesson 16) | The subledger extract ran before the day's final transactions posted |
| **Validity** (Lesson 14) | A cost-center code on new transactions doesn't exist in this month's valid cost-center list |

## Profiling and rules narrow it down (Chapters 2 and 4)

1. **Row count comparison** — the AP subledger shows 1,842 transactions
   for the month; the GL shows 1,798 transactions tagged to AP source.
   44 transactions exist in the subledger but never reached the GL —
   this immediately rules in **completeness** as at least part of the
   problem
2. **A referential integrity check** (Lesson 19) against this month's
   valid cost-center list flags 12 of those 44 transactions as having a
   cost-center code retired at the start of the month — a **validity**
   failure that's likely *why* those specific rows failed to post (the
   ERP's GL posting job silently rejects rows with invalid cost centers
   instead of erroring loudly)
3. **A timeliness check** (Lesson 16) on the extract job's run time
   shows it fired at 11:00 PM, before a final batch of same-day AP
   invoices was entered at 11:45 PM — accounting for the remaining 32
   missing transactions

Three dimensions, three distinct causes, one combined dollar impact.

## Root cause and remediation (Lessons 23–25)

Running 5 Whys (Lesson 23) on the validity failure lands on the real
cause fast: a new product line's cost centers were added to the
source system this month but the GL posting job's valid-cost-center
reference table — a separate, manually maintained list — wasn't
updated. That's a **process** root cause, not a technology bug.

The remediation workflow (Lesson 25) runs on an accelerated,
close-deadline timeline:

1. **Immediate fix** — the 12 invalid-cost-center transactions and the
   32 late transactions are manually re-posted today, so the close can
   happen on schedule (a backlog decision made explicitly, per Lesson
   23's three-part output, not silently)
2. **Source fix** — the cost-center reference table is updated and a
   data quality rule (Lesson 18) is added that checks new cost centers
   against the reference list *before* month-end, not during it
3. **Process fix** — the extract job's schedule moves to 1:00 AM, past
   every realistic same-day entry time, addressing the timeliness cause
   directly rather than just re-running the extract later every month

## Monitoring, scorecard, and issue closure (Lessons 26–28)

- A monitor now tracks **GL-to-subledger row count parity** daily, not
  just at month-end, so a gap like this surfaces with weeks of runway
  instead of two days
- A scorecard tile shows "Close readiness" to the finance team, with
  accuracy, completeness, and timeliness sub-metrics rolled in
- The issue is logged with full fields (Lesson 28): severity high
  (regulatory-adjacent reporting), owner assigned to the ERP admin
  team for the reference-table process gap, status moved through
  triaged → in progress → resolved → **verified** (the parity check is
  re-run and confirmed clean) → closed, with the process root cause
  documented so it doesn't quietly repeat next quarter when another
  product line launches

## What this closing case study demonstrates

Every chapter of this course shows up here, working together: naming
the right dimensions narrowed the investigation instead of guessing;
profiling and rule checks turned a vague "$214,000 off" into three
specific, countable causes; root cause analysis found a process gap,
not just bad rows; remediation fixed both the backlog and the cause on
a real deadline; and monitoring plus issue tracking make sure this
exact gap gets caught in days, not during the next close crunch.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Confirming that two related totals (GL and subledger) actually match |
| Subledger | A detailed ledger (AP, AR) that rolls up into the general ledger |
| Close calendar | The fixed schedule a finance team's month-end process must meet |

## Lab — course synthesis exercise

Using everything from this course, write a one-page remediation plan
for this extension of the Ashgrove Components scenario: next month,
profiling shows that 3% of AR transactions have a `customer_id` that
doesn't exist in the customer master table (a referential integrity
violation, Lesson 19), and the rate has been climbing 0.5% per month
for the last four months.

Your plan must include, in order:

1. Which dimension(s) this touches, and why
2. One specific profiling or rule-check query you'd run to confirm the
   scope (you may write pseudocode/SQL)
3. A plausible root cause, reached through a 5-Whys-style chain
4. A two-part remediation: the immediate fix for existing bad rows, and
   the source-level fix that stops new ones
5. What you'd monitor going forward, and what would appear on a
   scorecard for this metric
6. The issue record's severity and owner, with a one-sentence
   justification for each

## Check yourself — and for the course

Can you walk through all six stages above for the lab scenario without
re-reading the lesson? If you can, you've successfully applied the
full arc of this course — dimensions, profiling, rules, remediation,
monitoring, and issue management — to a problem you hadn't seen before,
which is the actual skill this course has been building toward since
Lesson 1.

Congratulations — that's the Data Quality Management course complete.
You've gone from defining what data quality even means, through
profiling and the six core dimensions, into writing real rules and
checks, and finally into remediating, monitoring, and managing quality
as an ongoing practice rather than a one-time cleanup. The Data
Governance path continues next with **Metadata Management and Business
Glossary** — where the catalogs, lineage, and shared definitions you'll
build next depend directly on the quality foundation you just finished.
