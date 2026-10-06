# Debits and Credits Explained

This is the lesson most new accounting students dread, usually because they've heard "debit means bad, credit means good" from somewhere, and that's simply not true. Debits and credits are not good or bad, increase or decrease, in any universal sense. They are nothing more than **left and right**. Once you accept that, everything else in this chapter becomes mechanical and learnable.

## What you'll learn

- What "debit" and "credit" actually mean, with no moral judgment attached
- Why every transaction needs both a debit and a credit
- The direct link between this chapter and the accounting equation from Chapter 1
- Why this 500-year-old convention is still exactly how Oracle Fusion posts journals today

## Debit and credit are just positions

The words come from Latin: *debere* (to owe) and *credere* (to entrust), but don't lean too hard on the etymology — in modern use, they are simply labels for the **left side** and the **right side** of an account.

- **Debit** = left side of an account
- **Credit** = right side of an account

That's it. There is no inherent "good" or "bad" direction. Whether a debit increases or decreases a given account's balance depends entirely on *what kind of account it is* — which is exactly what the next lesson (normal balances by account type) covers in detail. For now, just accept the plain mechanical fact: every entry goes on the left (debit) or the right (credit).

## Why every transaction needs both

Recall the accounting equation from lesson 2: Assets = Liabilities + Equity, and it must always stay balanced. Double-entry accounting enforces that balance through a simple rule:

**For every transaction, total debits must equal total credits.**

This is a purely mechanical check — it doesn't verify that you recorded the *right* accounts, only that whatever you recorded is arithmetically balanced. If you buy a $1,000 laptop with cash, you'll debit one account for $1,000 and credit another account for $1,000. The accounts chosen matter enormously (that's accounting judgment); the fact that the two sides must match is just bookkeeping arithmetic.

## A simple picture: the T-account

Visually, accountants represent an account as a capital letter T:

```
            Account Name
    DEBIT (left)  |  CREDIT (right)
    -------------------------------
       entries     |     entries
        here       |      here
```

Anything posted on the left is a debit to that account. Anything posted on the right is a credit to that account. We'll use T-accounts heavily starting in lesson 6, because they make it visually obvious whether debits and credits balance.

## A 500-year-old convention, still running today

Double-entry bookkeeping using debits and credits dates back to 15th-century Italian merchants (Luca Pacioli famously documented it in 1494). It survived five centuries because it is self-checking: if debits don't equal credits, you know immediately that something was recorded incorrectly, even before you know what the error is.

Oracle Fusion General Ledger, and every subledger that feeds it (Payables, Receivables, Fixed Assets, and so on), posts every single transaction as a journal entry with debits and credits, and the system will not let an unbalanced entry post. You are about to learn, at the conceptual level, exactly the mechanism running underneath every transaction you'll eventually configure or troubleshoot in Oracle Fusion.

## Recap

Debit means left side of an account; credit means right side. Neither is inherently an increase or a decrease — that depends on the account type, covered next. Every transaction must have equal total debits and total credits, which is how double-entry accounting keeps the accounting equation in balance. Next up, lesson 5: normal balances by account type, where "left" and "right" finally turn into "increase" and "decrease."
