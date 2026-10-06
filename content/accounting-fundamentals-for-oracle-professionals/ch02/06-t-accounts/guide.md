# T-Accounts

You've seen the T-account shape already, in passing. This lesson slows down and actually uses one: posting several transactions into a T-account, finding its balance, and seeing why this simple tool is still how accountants (and accounting students, and even some Oracle Fusion inquiry screens) visualize what's happening inside a single account.

## What you'll learn

- How to post debits and credits into a T-account
- How to calculate an account's ending balance from its postings
- Why a T-account's balance should always land on its normal-balance side
- How this relates to the account inquiry screens you'll eventually use in Oracle Fusion

## Building a T-account

A T-account has three parts: the account name on top, debits on the left, credits on the right.

```
                    Cash
   DEBIT                    |   CREDIT
  -----------------------------------------
```

To post a transaction, you simply write the dollar amount on the correct side. An increase to a debit-normal account (like Cash, an asset) goes on the left; a decrease goes on the right.

## Worked example: Cash at Brightwell Logistics

**Brightwell Logistics**, a fictional small company, has the following events during its first week:

1. Owner invests $10,000 cash to start the business.
2. Pays $2,000 cash for a month of warehouse rent.
3. Receives $4,500 cash from a customer for a completed job.
4. Pays $800 cash for fuel.

Posting only the Cash account (an asset, debit-normal):

```
                      Cash
   DEBIT                      |   CREDIT
  -------------------------------------------
   (1) $10,000                |   (2) $2,000
   (3)  $4,500                |   (4)   $800
  -------------------------------------------
   Total debits: $14,500      |   Total credits: $2,800
```

## Finding the ending balance

To find the balance of a T-account, total each side, then subtract the smaller total from the larger. The balance sits on whichever side had the larger total — and for a healthy, correctly posted account, that should match the account's normal balance.

Total debits: $14,500. Total credits: $2,800. $14,500 − $2,800 = **$11,700 debit balance**.

Cash is an asset, which is debit-normal, so it makes sense that its balance sits on the debit side. If Cash ever showed a *credit* balance, that would be a red flag — the business would be claiming to have negative cash, which is usually a sign of a recording error (or, in rare real cases, an overdraft being tracked in the wrong account).

## Why this still matters inside Oracle Fusion

When you eventually drill into an account balance inside Oracle Fusion General Ledger — using an account inquiry, a trial balance report, or drilling from a balance down to the underlying journal lines — you are looking at exactly this: a running total of debits and credits posted to one account, netted down to a balance. The screen looks modern, but the arithmetic underneath is the same T-account math from this lesson.

## Recap

A T-account posts debits on the left and credits on the right for a single account. Totaling both sides and subtracting the smaller from the larger gives the ending balance, which should land on the account's normal-balance side. This is the exact arithmetic behind every account balance you'll later inspect in Oracle Fusion. Next up, lesson 7: recording a transaction step by step, where we practice analyzing a transaction from scratch.
