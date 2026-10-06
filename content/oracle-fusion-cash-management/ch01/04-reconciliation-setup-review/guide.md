# Reconciliation Setup Review

Before we move into bank statements and reconciliation itself, this lesson pauses to pull together everything Chapter 1 covered into one setup checklist. Think of this as the "is the foundation actually in place" lesson — every item here has to exist before a single bank statement can be meaningfully reconciled.

## What you'll learn

- A consolidated checklist of everything a bank account needs before reconciliation can work
- What a cash clearing account is, and why reconciliation sometimes needs one
- The idea of a reconciliation tolerance, previewed ahead of Chapter 3
- How Chapter 2 (bank statements) and Chapter 3 (reconciliation) build on this foundation

## The setup checklist

For a bank account to be ready for reconciliation, each of the following needs to be true:

1. **The hierarchy exists.** The Bank and Bank Branch records are created, and the Bank Account itself exists underneath the correct branch (Lesson 2).
2. **The account has the Cash Management use enabled.** Without this use, the account cannot participate in reconciliation at all (Lesson 3).
3. **The account has a GL cash account assigned.** This is the code combination that represents this account's cash balance on the balance sheet — reconciled transactions post here.
4. **Security is configured appropriately.** Whoever will reconcile this account — typically the Cash Manager — has the access they need, whether through business-unit/function access or named user-and-role access (Lesson 3).
5. **A cash clearing account is assigned, if the business uses one.** Some implementations route certain transaction types (for example, outstanding checks that haven't cleared the bank yet) through an intermediate clearing account rather than directly to the main cash account, so the main cash account only reflects amounts the bank has actually processed.

## Why a clearing account sometimes matters

Here's the timing problem a clearing account solves: Payables issues a check today, and the GL records a reduction in cash today — but the bank won't actually clear that check for days. If every payment posted straight to the main cash GL account, that account's balance would never match the bank's balance on any given day, even though nothing is wrong. Routing the payment through a clearing account first, then moving it to the main cash account only once the bank statement confirms it cleared, keeps the two balances meaningfully comparable at any point in time.

## A preview: reconciliation tolerance

Chapter 3 will cover **tolerance rules** in depth, but it's worth planting the idea here: reconciliation rarely requires a bank statement amount and a system transaction amount to match to the exact cent in every case. A tolerance rule defines an acceptable variance — by percentage, by a flat amount, or both — within which a small mismatch (say, a fraction of a cent from a currency rounding difference) is still allowed to reconcile automatically rather than kicking out as an exception every time.

## How the next two chapters build on this

- **Chapter 2 (Bank Statements)** assumes the bank account hierarchy and GL cash account already exist — it's entirely about getting the bank's version of events (the statement) into Oracle in a usable form.
- **Chapter 3 (Reconciliation)** assumes statements are already loaded — it's about matching those statement lines against system transactions, using the accounts and access you set up in this chapter.

If any item on the checklist above is missing, reconciliation won't fail loudly — it will quietly produce exceptions, orphaned transactions, or a cash account that never ties to the bank. Getting Chapter 1 right is what makes Chapters 2 and 3 straightforward instead of a constant troubleshooting exercise.

## Key terms

| Term | Meaning |
|---|---|
| Cash clearing account | An intermediate GL account used for timing differences before cash fully clears |
| Reconciliation tolerance | An acceptable variance (percentage/amount) allowed during matching |

## Recap

Reconciliation depends on a complete foundation: the bank account hierarchy, the Cash Management use, a GL cash account, correct security, and optionally a clearing account for timing differences. Get this right, and the next two chapters — bank statements and reconciliation — build cleanly on top of it. Next up, lesson 5: the file formats banks actually send, starting with BAI2, MT940, and CAMT.053.
