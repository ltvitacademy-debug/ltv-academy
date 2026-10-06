# Lesson 21 — Journal Copy and Reuse

**Chapter 4 · Automating Journals · Lesson 21 of 37**

## What you'll learn

- When Copy Journal is the right tool, instead of a recurring journal or allocation
- What carries over when you copy a journal, and what you still have to check
- Why a copied journal starts back at square one on validation and approval
- How to decide, going forward, which of this chapter's four tools fits a given entry

## Not every repeat entry deserves full automation

Chapters 17-20 built real automation: recurring journals and allocation rules that generate themselves from a standing definition. But some journals repeat only *loosely* — similar to last month's, but not identical in a way a formula could cleanly capture, or a one-time entry you expect to need again in a slightly different form later. For those, **Copy Journal** is the simpler, manual tool: it duplicates an existing journal's lines into a new draft, which you then adjust by hand.

## What carries over, and what doesn't

When you copy a journal:

- **Lines, accounts, and amounts** copy exactly as they were — a starting point, not a final answer
- **Status resets to Incomplete** — the copy is a fresh draft, regardless of whether the original was posted
- **The accounting date does not carry over blindly usable** — you must set a date in a currently valid (Open or Future Enterable) period, since the original's period may now be closed

```
Original (posted, February): Dr Marketing Expense 3,400 / Cr Accrued Liabilities 3,400
Copy →  New draft (Incomplete): same lines, same amounts
  You edit: accounting date → March, amount → 3,600 (this month's actual invoice estimate)
  You complete, validate, (approve if required), post — as a brand-new journal
```

## Why a copy starts back at square one

A copied journal is, functionally, a brand-new journal entry that happens to start with pre-filled lines. Everything from Chapters 2 and 3 still applies in full: it must **balance** (Lesson 6), it must pass **validation** (Lesson 9) against the period and accounts you actually choose, and it routes through **approval** (Lesson 12) exactly like any other journal with that source and category. Copying saves retyping — it does not skip a single control.

## Choosing the right tool for a repeating entry

| Situation | Best tool |
|---|---|
| Exact same accounts and amount, every period | Standard recurring journal (Lesson 17) |
| Same accounts, amount varies and must be typed by a person | Skeleton recurring journal (Lesson 17) |
| Amount is derivable from balances/statistics already in the ledger | Formula recurring journal (Lesson 17) |
| One pool needs to be split across many targets proportionally | Allocation (Lessons 19-20) |
| Similar to a past entry, but irregular or one-off | Copy Journal |

## Key terms

| Term | Meaning |
|---|---|
| Copy Journal | Duplicates an existing journal's lines into a new, editable draft |
| Incomplete (on copy) | The status every copied journal starts in, regardless of the original's status |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: if you copy a journal that was posted in February and the accounting date still says February, why would that likely cause a validation error when you try to complete the copy in April?
