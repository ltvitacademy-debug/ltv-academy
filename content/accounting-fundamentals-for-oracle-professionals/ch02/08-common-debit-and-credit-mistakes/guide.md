# Common Debit and Credit Mistakes

Every student (and more than a few professionals) makes the same handful of debit-and-credit mistakes on the way to fluency. This lesson closes out Chapter 2 by naming them directly, so you recognize them instantly rather than stumbling into each one yourself.

## What you'll learn

- Four of the most common debit/credit mistakes
- How each mistake shows up in practice
- A quick self-check you can run on any journal entry you write
- Why Oracle Fusion can catch some of these mistakes automatically, but not all of them

## Mistake 1: thinking debit always means "increase"

This is the single most common misconception, and it's exactly the trap lesson 4 warned about. Debit means *left*, not "increase." Whether a debit increases or decreases an account depends entirely on the account's type. A debit increases Cash (an asset) but decreases Accounts Payable (a liability). Students who memorize "debit = increase" inevitably get liability, equity, and revenue transactions backwards.

**Fix**: always ask "what type of account is this?" before deciding which side an increase lands on. Lean on the normal-balance table from lesson 5 every time, until it's automatic.

## Mistake 2: forgetting that totals must balance

A journal entry with a $500 debit and only a $450 credit is simply wrong — not "close enough." Every transaction, no exceptions, must have total debits equal to total credits.

**Fix**: after drafting any entry, add up the debit column and the credit column separately. If they don't match exactly, you've either mis-keyed an amount or you're missing a line.

## Mistake 3: picking the wrong account, even with the right side

It's possible to get the debit/credit mechanics perfectly correct while still recording the wrong *story*. For example, recording a payment toward a loan's principal as "Interest Expense" instead of splitting it correctly between Interest Expense and the loan's liability account. The debits and credits will balance, and the entry will look fine arithmetically — but the financial statements will be wrong.

**Fix**: mechanics (steps 2–4 from lesson 7) only work if step 1 — identifying the right accounts — was done correctly first. A balanced-but-wrong entry is still wrong.

## Mistake 4: confusing "normal balance" with "the only balance it can ever have"

A normal balance is the *typical* side an account sits on, not a hard rule it can never violate. A checking account overdrawn below zero, for instance, can briefly show a credit balance even though Cash is debit-normal. The normal balance tells you what to expect and investigate when violated — it isn't an absolute law of physics.

**Fix**: treat an abnormal balance as a prompt to investigate, not an automatic error. Sometimes it's legitimate; often it's a sign something was posted incorrectly.

## A quick self-check

Before finalizing any journal entry, ask:

1. Do total debits equal total credits? (purely arithmetic)
2. Did I correctly identify every account the transaction actually touches? (judgment)
3. Does each account's balance direction make sense given what actually happened? (sanity check)

## Why Oracle Fusion catches some of this, not all of it

Oracle Fusion Financials will absolutely stop mistake 2 — it enforces balanced journals at a system level and simply won't let an unbalanced entry post. It can also be configured with validation rules that catch some cases of mistake 3 (for example, requiring a specific account combination for a transaction type). But it cannot catch a human correctly balancing an entry that tells the wrong financial story, or a human overriding a default account incorrectly. That's exactly why the accounting judgment this course builds matters even inside a heavily automated system — software enforces arithmetic, not meaning.

## Recap

The four classic mistakes are: assuming debit always means increase, forgetting that debits must equal credits, choosing the wrong accounts despite correct mechanics, and treating a normal balance as an unbreakable rule rather than an expectation. That closes Chapter 2. Next up, Chapter 3 and lesson 9: assets, the first of the five account types we'll study in depth.
