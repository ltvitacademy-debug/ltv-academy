# Lesson 10 — Posting Journals

**Chapter 2 · Manual Journals · Lesson 10 of 37**

## What you'll learn

- What a journal must have before it's eligible to post
- What posting actually changes
- Why a posted journal becomes read-only
- The difference between posting one batch and posting many at once

## What has to be true before a journal can post

A journal is eligible to post only once it has:

1. Passed **validation** (Lesson 9) — balanced, valid accounts, open period, no cross-validation violations
2. Completed its **approval workflow**, if one applies (Chapter 3) — or required no approval at all
3. An accounting date in a period with **Open** status (Lesson 4)

Posting is the action that takes a validated, approved journal and makes it real: it updates the account balances those journal lines affect.

## What posting actually does

Before posting, a journal's debits and credits exist only as a draft — they have not touched a single account balance. **Posting is the step that updates the balances cube** (Lesson 2) for every account combination, period, currency, and balance type the journal's lines touch. Immediately after posting finishes, an account inquiry or the trial balance reflects the new amounts.

```
Before posting: Cash balance (Mar) = $40,750   (journal not yet posted)
Post journal:    Dr Office Supplies Exp 1,250 / Cr Accrued Liabilities 1,250
After posting:   Accrued Liabilities balance (Mar) increases by 1,250
                 Office Supplies Exp balance (Mar) increases by 1,250
                 Cash is untouched — this accrual never touched cash
```

## Posting one batch, or many at once

You can post a single batch from the Journals work area right after completing it, or you can select several unposted, approved batches and post them together in one action from Manage Journals — useful at month-end when a controller wants to post a dozen cleared batches in one pass instead of opening each individually. Either way, posting itself runs as a submitted process you can monitor to completion in Scheduled Processes, not an instant on-screen flip.

## Why a posted journal is read-only

Once a journal posts, its lines can no longer be edited — not the amounts, not the accounts, not the date. This is deliberate: a posted journal has already changed real balances, and quietly editing it afterward would make those balances untrustworthy for anyone who already reported off them. If a posted journal turns out to be wrong, the fix is a **reversal**, which is exactly what Lesson 11 covers next — not an edit, but a new journal that undoes the old one.

## Key terms

| Term | Meaning |
|---|---|
| Posting eligibility | Validated, approved (if required), and dated in an Open period |
| Posting | The action that updates account balances from a journal's lines |
| Read-only after posting | A posted journal's lines can never be edited directly |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: if a journal posts to the wrong account, why can't you just edit the posted journal to fix it?
