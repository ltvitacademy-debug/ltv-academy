# Lesson 8 — Journal Batches and Journal Lines

**Chapter 2 · Manual Journals · Lesson 8 of 37**

## What you'll learn

- The three-level hierarchy: batch, journal entry, journal line
- Why batches exist even when you're only entering one journal
- What control totals are for, and how to use them to self-check data entry
- How to tell a complete batch from one still in progress

## Three levels, one hierarchy

Oracle Fusion General Ledger organizes entries in three nested levels:

```
Journal Batch
  └── Journal Entry (one or more per batch)
        └── Journal Line (one or more per journal entry)
```

A **batch** is the container you actually submit and post. A single batch can hold **more than one journal entry** — useful when several related journals (say, three different accruals prepared together at month-end) should move through review and posting as one unit. Each **journal entry** inside the batch has its own header (ledger, name, date, source, category, currency) and its own set of **lines**, each carrying one account combination and one debit or credit amount.

When you used **Create Journal** in Lesson 6, Oracle created a batch behind the scenes automatically, containing exactly one journal entry — you just didn't have to think about the batch level because there was nothing else in it.

## Why batch at all?

Batching several related journals together means:

- They can be reviewed and posted as a single unit instead of one at a time
- A single posting run updates balances for every journal in the batch together
- An **approval**, when required, can apply at the batch level rather than journal by journal

## Control totals: a self-check on data entry

A **control total** is an optional field where you type the total amount you *expect* the batch to contain before you finish entering lines — for example, if you know in advance that March's accrual batch should total $8,400 in debits, you enter 8,400 as the control total. If what you actually entered doesn't match, General Ledger flags the discrepancy before you complete the batch, catching a transposed digit or a missed line early rather than after posting.

```
Batch: March Accruals            Control total entered: 8,400.00
  Journal 1: Office Supplies Accrual     1,250.00
  Journal 2: Utilities Accrual           3,150.00
  Journal 3: Consulting Accrual          4,000.00
  Actual total entered:                  8,400.00   ✓ matches
```

## Reading batch and journal status

A batch and each journal inside it carry their own status — **Incomplete** (still being entered or failed validation), **Unposted** (complete and balanced, waiting to post), **Posted**, or showing an **approval status** if a workflow applies. Lesson 9 covers exactly what causes a journal to fail validation and stay Incomplete, and Lesson 10 covers what posting actually changes.

## Key terms

| Term | Meaning |
|---|---|
| Journal batch | The top-level container submitted and posted; can hold multiple journal entries |
| Journal entry | One header (ledger, date, source, category, currency) plus its lines |
| Control total | An optional expected-total field used to self-check manual data entry |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what is the benefit of putting three related accrual journals into one batch instead of entering and posting them separately?
