# The Trial Balance

Every lesson so far has emphasized that debits must equal credits. The trial balance is the report that actually proves it, across every account in the entire ledger at once, and it's the traditional checkpoint before financial statements get built.

## What you'll learn

- What a trial balance is and what it contains
- How to prepare one from a set of account balances
- What it proves, and — importantly — what it does NOT prove
- Why this report is still a standard step inside Oracle Fusion General Ledger

## What a trial balance is

A **trial balance** is a simple report listing every account in the general ledger along with its ending balance, split into two columns: debit balances and credit balances. Its entire purpose is to confirm one thing: that total debit balances equal total credit balances across the whole ledger.

```
Account                  Debit        Credit
----------------------------------------------
Cash                     $45,000
Accounts Receivable      $12,000
Equipment                $30,000
Accounts Payable                      $8,000
Notes Payable                         $20,000
Common Stock                          $50,000
Service Revenue                       $25,000
Rent Expense              $9,000
Utilities Expense         $7,000
----------------------------------------------
Totals                   $103,000     $103,000
```

If the two column totals match, the trial balance "balances" — hence the name.

## Worked example, step by step

Preparing a trial balance means: list every account that has a balance, put debit-normal balances in the debit column and credit-normal balances in the credit column (because, if the books are correct, each account's balance should already sit on its normal side — see lesson 5), then total both columns. In the example above, both columns total exactly $103,000, which is the first good sign that the period's postings were internally consistent.

## What a balanced trial balance proves — and what it doesn't

This is the most important nuance in the lesson, and it echoes a warning from lesson 8: a balanced trial balance proves that total debits equal total credits. It does **not** prove that every transaction was recorded to the *correct* accounts. If you accidentally debited "Office Supplies" instead of "Equipment" for a $5,000 purchase, but you still credited Cash $5,000, the trial balance will balance perfectly — it has no way of knowing you picked the wrong account, because both sides are still mathematically equal. A balanced trial balance is a necessary condition for correct books, not a sufficient one.

## Why the trial balance still matters inside Oracle Fusion

Even in a fully automated system like Oracle Fusion General Ledger, a trial balance report is a standard, frequently run report — it's one of the fastest sanity checks available before closing a period or generating financial statements, and it's often the very first thing a consultant pulls when troubleshooting "why don't these numbers look right." Recognizing a trial balance for exactly what it is, and exactly what it isn't, will save you from a very common beginner mistake: treating "it balances" as proof that everything is correct.

## Recap

A trial balance lists every account's ending balance, split into debit and credit columns, and proves only that total debits equal total credits — not that the right accounts were used. It remains a standard checkpoint report even inside fully automated systems like Oracle Fusion. Next up, lesson 18: finding errors in a trial balance, for the (hopefully rare) case where it doesn't balance at all.
