# Journal Entries

You've already been writing journal entries informally since Chapter 2. This lesson formalizes the format, introduces the full anatomy of a proper journal entry, and extends it to entries with more than two lines.

## What you'll learn

- The standard anatomy of a journal entry
- The difference between a simple entry and a compound entry
- How a journal entry is the literal starting point of the Oracle Fusion accounting flow
- A worked compound entry, step by step

## Anatomy of a journal entry

A properly formatted journal entry includes:

- **Date** — when the transaction occurred
- **Accounts and amounts** — debits listed first (conventionally indented less), credits listed second (conventionally indented more, to visually show they're "subordinate" to the debit above)
- **A memo/description** — a short note explaining what the entry represents, crucial later when someone (possibly you, months later) needs to understand why it was recorded

```
Date: 2026-03-15
  Debit  Equipment                $8,000
  Credit Cash                              $8,000
Memo: Purchased printing equipment for cash.
```

## Simple vs. compound entries

A **simple entry** has exactly one debit and one credit line — every example so far in this course has been simple. A **compound entry** has more than two lines total (several debits, several credits, or both), but the core rule never changes: total debits must still equal total credits across the *entire* entry.

## Worked example: a compound entry

A fictional bakery, **Millbrook Bread Co.**, pays $2,000 cash and takes out a $6,000 loan to buy a $8,000 commercial oven.

```
Date: 2026-04-02
  Debit  Equipment (Oven)          $8,000
  Credit Cash                               $2,000
  Credit Notes Payable                      $6,000
Memo: Purchased commercial oven; partial cash, partial financed.
```

Check the total: Debit side totals $8,000. Credit side totals $2,000 + $6,000 = $8,000. Balanced, even with three lines instead of two.

## Why journal entries matter so much to an Oracle Fusion consultant

Every single transaction inside Oracle Fusion Financials — a supplier invoice in Payables, a customer payment in Receivables, a depreciation run in Assets, a manual adjustment in General Ledger — ultimately becomes a journal entry with this exact anatomy: a date, one or more debit lines, one or more credit lines, and a description. The Subledger Accounting engine you'll study deeply later in the path is, at its core, a rules engine whose entire job is turning subledger transactions into correctly formed journal entries like the ones in this lesson. Everything from here forward in your Oracle Fusion career comes back to this shape.

## Recap

A journal entry has a date, debit and credit lines (one or more of each), and a memo. Simple entries have exactly one debit and one credit; compound entries have more lines but must still balance in total. This exact structure is what every Oracle Fusion subledger transaction turns into behind the scenes. Next up, lesson 15: adjusting and reversing entries, special-purpose journal entries used at period boundaries.
